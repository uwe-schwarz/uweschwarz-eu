#!/usr/bin/env bun

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { URL } from "node:url";

import pixelmatch from "pixelmatch";
import { chromium } from "playwright";
import { PNG } from "pngjs";

const DEFAULT_VIEWPORT = { height: 1800, width: 1440 };
const DEFAULT_LANGUAGE = "de";
const DEFAULT_THEME = "light";
const DEFAULT_SAMPLES = 2;
const DEFAULT_SETTLE_MS = 350;
const DEFAULT_SAMPLE_DELAY_MS = 250;
const DEFAULT_TIMEOUT_MS = 30_000;
const MIN_ALLOWED_PIXEL_RATIO = 0.000_02;
const MIN_ALLOWED_PIXELS = 100;
const NOISE_MULTIPLIER = 3;
const STORAGE_KEYS = {
  language: "user-settings:language:v1",
  theme: "user-settings:theme:v1",
};

const TARGETS = [
  {
    id: "home",
    kind: "page",
    label: "Home",
    path: (language) => `/${language}`,
    readySelector: "#hero",
  },
  {
    id: "imprint",
    kind: "page",
    label: "Imprint",
    path: (language) => `/${language}/imprint`,
    readySelector: "main",
  },
  {
    id: "privacy",
    kind: "page",
    label: "Privacy",
    path: (language) => `/${language}/privacy`,
    readySelector: "main",
  },
  {
    id: "cv",
    kind: "page",
    label: "CV",
    path: (language) => `/${language}/cv`,
    readySelector: 'iframe[title="Curriculum Vitae"]',
  },
];

function printUsage() {
  writeStdout(`Usage:
  bun run deps:visual -- capture --base-url http://127.0.0.1:3301 [--output-dir /tmp/path]
  bun run deps:visual -- compare --before-dir /tmp/before --after-dir /tmp/after [--output-dir /tmp/report]

Options:
  --lang <code>           Language to capture. Default: ${DEFAULT_LANGUAGE}
  --theme <mode>          Theme to capture. Default: ${DEFAULT_THEME}
  --samples <n>           Number of screenshots per target. Default: ${DEFAULT_SAMPLES}
  --settle-ms <n>         Wait after each navigation. Default: ${DEFAULT_SETTLE_MS}
  --sample-delay-ms <n>   Wait between repeated samples. Default: ${DEFAULT_SAMPLE_DELAY_MS}
  --viewport-width <n>    Default: ${DEFAULT_VIEWPORT.width}
  --viewport-height <n>   Default: ${DEFAULT_VIEWPORT.height}
  --timeout-ms <n>        Default: ${DEFAULT_TIMEOUT_MS}`);
}

function parseArgs(argv) {
  const normalizedArgv = argv[0] === "--" ? argv.slice(1) : argv;
  const [command, ...rest] = normalizedArgv;
  const options = {};

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];

    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    const [rawKey, inlineValue] = token.slice(2).split("=", 2);
    const nextValue = inlineValue ?? rest[index + 1];

    if (inlineValue == null) {
      if (nextValue == null || nextValue.startsWith("--")) {
        options[rawKey] = true;
        continue;
      }

      options[rawKey] = nextValue;
      index += 1;
      continue;
    }

    options[rawKey] = nextValue;
  }

  return { command, options };
}

function toInt(value, fallback) {
  if (value == null) {
    return fallback;
  }

  const parsed = Number.parseInt(String(value), 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Expected integer, received: ${value}`);
  }

  return parsed;
}

function resolveOutputDir(explicitPath, prefix) {
  if (explicitPath) {
    return path.resolve(String(explicitPath));
  }

  return path.join(os.tmpdir(), `${prefix}-${new Date().toISOString().replaceAll(/[:.]/g, "-")}`);
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeStdout(message) {
  process.stdout.write(`${message}\n`);
}

function writeStderr(message) {
  process.stderr.write(`${message}\n`);
}

function joinUrl(baseUrl, relativeUrl) {
  return new URL(relativeUrl, baseUrl).toString();
}

function normalizeLanguage(value) {
  return value === "en" ? "en" : DEFAULT_LANGUAGE;
}

function normalizeTheme(value) {
  return value === "dark" ? "dark" : DEFAULT_THEME;
}

async function installVisualRegressionMode(page, { language, theme }) {
  await page.addInitScript(
    ({ languageValue, storageKeys, themeValue }) => {
      globalThis.localStorage.setItem(storageKeys.language, languageValue);
      globalThis.localStorage.setItem(storageKeys.theme, themeValue);
      globalThis.localStorage.removeItem("language");
      globalThis.localStorage.removeItem("theme");
      globalThis.document.documentElement.dataset.visualRegression = "true";
    },
    {
      languageValue: language,
      storageKeys: STORAGE_KEYS,
      themeValue: theme,
    },
  );
}

async function applyVisualRegressionStyles(page) {
  await page.addStyleTag({
    content: `
      html {
        scroll-behavior: auto !important;
      }

      *, *::before, *::after {
        animation: none !important;
        caret-color: transparent !important;
        transition: none !important;
      }

      [data-visual-regression="hero-rings"] {
        visibility: hidden !important;
      }
    `,
  });
}

async function stabilizePage(page, settleMs) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    const documentRef = globalThis.document;

    if ("fonts" in documentRef) {
      await documentRef.fonts.ready;
    }
  });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(settleMs);
}

async function createBrowserContext(browser, options) {
  const language = normalizeLanguage(options.lang);
  const theme = normalizeTheme(options.theme);
  const url = new URL(String(options["base-url"]));

  const context = await browser.newContext({
    colorScheme: theme,
    deviceScaleFactor: 1,
    extraHTTPHeaders: {
      "accept-language": language === "de" ? "de-DE,de;q=0.9,en;q=0.5" : "en-US,en;q=0.9,de;q=0.5",
    },
    locale: language === "de" ? "de-DE" : "en-US",
    timezoneId: "Europe/Berlin",
    viewport: {
      height: toInt(options["viewport-height"], DEFAULT_VIEWPORT.height),
      width: toInt(options["viewport-width"], DEFAULT_VIEWPORT.width),
    },
  });

  await context.addCookies([
    {
      domain: url.hostname,
      name: "language",
      path: "/",
      value: language,
    },
    {
      domain: url.hostname,
      name: "theme",
      path: "/",
      value: theme,
    },
  ]);

  const page = await context.newPage();
  await installVisualRegressionMode(page, { language, theme });

  return { context, language, page, theme };
}

async function captureTargets(page, baseUrl, outputDir, options, manifestTargets, language) {
  const samples = toInt(options.samples, DEFAULT_SAMPLES);
  const settleMs = toInt(options["settle-ms"], DEFAULT_SETTLE_MS);
  const sampleDelayMs = toInt(options["sample-delay-ms"], DEFAULT_SAMPLE_DELAY_MS);
  const timeoutMs = toInt(options["timeout-ms"], DEFAULT_TIMEOUT_MS);

  for (const target of TARGETS) {
    const targetDir = path.join(outputDir, target.id);
    const targetPath = target.path(language);
    await ensureDir(targetDir);

    const files = [];

    for (let sample = 1; sample <= samples; sample += 1) {
      await page.goto(joinUrl(baseUrl, targetPath), {
        timeout: timeoutMs,
        waitUntil: "networkidle",
      });
      await applyVisualRegressionStyles(page);

      if (target.readySelector) {
        await page.locator(target.readySelector).waitFor({
          state: "visible",
          timeout: timeoutMs,
        });
      }

      await stabilizePage(page, settleMs);

      const relativePath = path.join(target.id, `sample-${sample}.png`);
      await page.screenshot({
        animations: "disabled",
        fullPage: true,
        path: path.join(outputDir, relativePath),
        type: "png",
      });
      files.push(relativePath);

      if (sample < samples) {
        await page.waitForTimeout(sampleDelayMs);
      }
    }

    manifestTargets.push({
      files,
      id: target.id,
      kind: target.kind,
      label: target.label,
      url: targetPath,
    });
  }
}

async function runCapture(options) {
  const baseUrl = options["base-url"];
  if (!baseUrl) {
    throw new Error("Missing required option: --base-url");
  }

  const outputDir = resolveOutputDir(options["output-dir"], "deps-visual-capture");
  await ensureDir(outputDir);

  const browser = await chromium.launch({ headless: true });

  try {
    const { context, language, page, theme } = await createBrowserContext(browser, options);
    const manifestTargets = [];

    await captureTargets(page, baseUrl, outputDir, options, manifestTargets, language);

    await context.close();

    const manifest = {
      baseUrl,
      capturedAt: new Date().toISOString(),
      language,
      outputDir,
      sampleCount: toInt(options.samples, DEFAULT_SAMPLES),
      targets: manifestTargets.sort((left, right) => left.id.localeCompare(right.id)),
      theme,
    };

    await writeJson(path.join(outputDir, "manifest.json"), manifest);

    writeStdout(`Captured ${manifest.targets.length} targets into ${outputDir}`);
  } finally {
    await browser.close();
  }
}

async function readManifest(manifestDir) {
  const manifestPath = path.join(path.resolve(manifestDir), "manifest.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  return {
    ...manifest,
    rootDir: path.resolve(manifestDir),
  };
}

function buildPairs(filesA, filesB) {
  const pairs = [];

  for (const fileA of filesA) {
    for (const fileB of filesB) {
      pairs.push([fileA, fileB]);
    }
  }

  return pairs;
}

async function readPng(filePath) {
  return PNG.sync.read(await fs.readFile(filePath));
}

async function compareImagePair(fileA, fileB) {
  const imageA = await readPng(fileA);
  const imageB = await readPng(fileB);

  if (imageA.width !== imageB.width || imageA.height !== imageB.height) {
    return {
      compatible: false,
      dimensions: {
        after: `${imageB.width}x${imageB.height}`,
        before: `${imageA.width}x${imageA.height}`,
      },
    };
  }

  const diffImage = new PNG({ height: imageA.height, width: imageA.width });
  const changedPixels = pixelmatch(imageA.data, imageB.data, diffImage.data, imageA.width, imageA.height, {
    includeAA: true,
    threshold: 0.1,
  });

  return {
    changedPixels,
    compatible: true,
    diffImage,
    totalPixels: imageA.width * imageA.height,
  };
}

async function writeDiffImage(outputDir, targetId, diffImage) {
  const diffDir = path.join(outputDir, "diffs");
  await ensureDir(diffDir);
  const diffPath = path.join(diffDir, `${targetId}.png`);
  await fs.writeFile(diffPath, PNG.sync.write(diffImage));
  return diffPath;
}

function computeAllowedPixels({ noisePixels, totalPixels }) {
  const minimumPixels = Math.max(MIN_ALLOWED_PIXELS, Math.ceil(totalPixels * MIN_ALLOWED_PIXEL_RATIO));

  return Math.max(minimumPixels, Math.ceil(noisePixels * NOISE_MULTIPLIER));
}

async function runCompare(options) {
  const beforeDir = options["before-dir"];
  const afterDir = options["after-dir"];

  if (!beforeDir || !afterDir) {
    throw new Error("Missing required options: --before-dir and --after-dir");
  }

  const reportDir = resolveOutputDir(options["output-dir"], "deps-visual-report");
  await ensureDir(reportDir);

  const beforeManifest = await readManifest(beforeDir);
  const afterManifest = await readManifest(afterDir);
  const afterTargetsById = new Map(afterManifest.targets.map((target) => [target.id, target]));
  const results = [];

  for (const beforeTarget of beforeManifest.targets) {
    const afterTarget = afterTargetsById.get(beforeTarget.id);

    if (!afterTarget) {
      results.push({
        id: beforeTarget.id,
        label: beforeTarget.label,
        reason: "Target missing from after manifest.",
        status: "failed",
      });
      continue;
    }

    const beforeFiles = beforeTarget.files.map((file) => path.join(beforeManifest.rootDir, file));
    const afterFiles = afterTarget.files.map((file) => path.join(afterManifest.rootDir, file));
    const noiseComparisons = [];

    if (beforeFiles.length > 1) {
      const beforePairs = buildPairs(beforeFiles, beforeFiles).filter(([left, right]) => left < right);

      for (const [left, right] of beforePairs) {
        noiseComparisons.push(await compareImagePair(left, right));
      }
    }

    if (afterFiles.length > 1) {
      const afterPairs = buildPairs(afterFiles, afterFiles).filter(([left, right]) => left < right);

      for (const [left, right] of afterPairs) {
        noiseComparisons.push(await compareImagePair(left, right));
      }
    }

    const incompatibleNoise = noiseComparisons.find((comparison) => !comparison.compatible);
    if (incompatibleNoise) {
      results.push({
        dimensions: incompatibleNoise.dimensions,
        id: beforeTarget.id,
        label: beforeTarget.label,
        reason: "Incompatible dimensions inside calibration samples.",
        status: "failed",
      });
      continue;
    }

    const crossPairs = buildPairs(beforeFiles, afterFiles);
    let bestMatch = null;

    for (const [left, right] of crossPairs) {
      const comparison = await compareImagePair(left, right);

      if (!comparison.compatible) {
        bestMatch = {
          dimensions: comparison.dimensions,
          reason: "Screenshot dimensions changed.",
          status: "failed",
        };
        break;
      }

      if (bestMatch == null || bestMatch.status === "failed" || comparison.changedPixels < bestMatch.changedPixels) {
        bestMatch = {
          changedPixels: comparison.changedPixels,
          diffImage: comparison.diffImage,
          status: "ok",
          totalPixels: comparison.totalPixels,
        };
      }
    }

    if (!bestMatch || bestMatch.status === "failed") {
      results.push({
        dimensions: bestMatch?.dimensions,
        id: beforeTarget.id,
        label: beforeTarget.label,
        reason: bestMatch?.reason ?? "No comparable screenshots found.",
        status: "failed",
      });
      continue;
    }

    const noisePixels = noiseComparisons.reduce(
      (maximum, comparison) => Math.max(maximum, comparison.changedPixels),
      0,
    );
    const allowedPixels = computeAllowedPixels({
      noisePixels,
      totalPixels: bestMatch.totalPixels,
    });
    const changedRatio = bestMatch.changedPixels / bestMatch.totalPixels;
    const allowedRatio = allowedPixels / bestMatch.totalPixels;
    const passed = bestMatch.changedPixels <= allowedPixels;
    const diffImagePath = await writeDiffImage(reportDir, beforeTarget.id, bestMatch.diffImage);

    results.push({
      allowedPixels,
      allowedRatio,
      changedPixels: bestMatch.changedPixels,
      changedRatio,
      diffImagePath,
      id: beforeTarget.id,
      label: beforeTarget.label,
      noisePixels,
      status: passed ? "passed" : "failed",
    });
  }

  const failedTargets = results.filter((result) => result.status === "failed");
  const summary = {
    afterDir: path.resolve(afterDir),
    beforeDir: path.resolve(beforeDir),
    comparedAt: new Date().toISOString(),
    failedTargets: failedTargets.map((target) => target.id),
    passed: failedTargets.length === 0,
    reportDir,
    results,
    targetCount: results.length,
  };

  await writeJson(path.join(reportDir, "report.json"), summary);

  for (const result of results) {
    if (result.status === "passed") {
      writeStdout(
        `PASS ${result.id}: changed=${result.changedPixels} allowed=${result.allowedPixels} noise=${result.noisePixels}`,
      );
      continue;
    }

    writeStdout(`FAIL ${result.id}: ${result.reason ?? `changed=${result.changedPixels}`}`);
  }

  writeStdout(`Report written to ${reportDir}`);

  if (!summary.passed) {
    process.exitCode = 1;
  }
}

async function main() {
  const { command, options } = parseArgs(process.argv.slice(2));

  if (!command || command === "help" || command === "--help" || options.help) {
    printUsage();
    return;
  }

  if (command === "capture") {
    await runCapture(options);
    return;
  }

  if (command === "compare") {
    await runCompare(options);
    return;
  }

  throw new Error(`Unsupported command: ${command}`);
}

try {
  await main();
} catch (error) {
  writeStderr(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
