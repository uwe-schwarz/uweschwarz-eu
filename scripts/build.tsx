import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

import { PageFrame } from "../src/app/PageFrame";
import { themeInitScript } from "../src/app/document-preferences";
import { AGENT_DISCOVERY_LINKS, buildHomepageMarkdown } from "../src/lib/agent-readiness";
import { SUPPORTED_LANGUAGES, withLanguagePrefix } from "../src/lib/i18n";
import { SITE_URL } from "../src/lib/site-config";
import { pages, pageMetadata } from "./site-routes";

const root = resolve(import.meta.dir, "..");
const output = resolve(root, ".vercel/output");
const staticDir = resolve(output, "static");

function run(script: string) {
  const result = Bun.spawnSync([process.execPath, "run", script], { cwd: root, stderr: "inherit", stdout: "inherit" });
  if (result.exitCode !== 0) {
    throw new Error(`${script} failed`);
  }
}

function hash(source: string) {
  return createHash("sha256").update(source).digest("hex").slice(0, 16);
}

// The alias page redirects before paint on hosts without language-aware routing.
// Explicit /de and /en URLs always win over stored/browser preferences.
const languageInitScript = `(() => {
  const match = location.pathname.match(/^\\/(de|en)(?:\\/|$)/);
  let language = match?.[1];
  if (!language) {
    const saved = document.cookie.match(/(?:^|;\\s*)language=(de|en)(?:;|$)/)?.[1];
    language = saved || (navigator.languages || [navigator.language]).map(tag => tag.slice(0, 2).toLowerCase()).find(tag => tag === 'de' || tag === 'en') || 'en';
    const path = location.pathname === '/' ? '' : location.pathname.replace(/\\/$/, '');
    location.replace('/' + language + path + location.search + location.hash);
  } else {
    document.cookie = 'language=' + language + '; path=/; max-age=31536000; samesite=lax';
  }
})();`;

export async function buildSite() {
  run("generate:cv");
  run("generate:llms");
  run("generate:sitemap");
  await rm(output, { force: true, recursive: true });
  await mkdir(staticDir, { recursive: true });
  await cp(resolve(root, "public"), staticDir, { recursive: true });

  const assets = resolve(staticDir, "assets");
  await mkdir(assets, { recursive: true });
  const fonts = [
    ["Geist Sans", "geist-sans/Geist-Variable.woff2", "100 900"],
    ["Geist Mono", "geist-mono/GeistMono-Variable.woff2", "100 900"],
    ["Geist Pixel Circle", "geist-pixel/GeistPixel-Circle.woff2", "500"],
  ];
  const fontFaces: Array<string> = [];
  const fontUrls: Array<string> = [];
  for (const [family, file, weight] of fonts) {
    const bytes = await readFile(resolve(root, "src/assets/fonts", file));
    const name = `${file.split("/").at(-1)?.replace(".woff2", "")}-${hash(bytes.toString("base64"))}.woff2`;
    await Bun.write(resolve(assets, name), bytes);
    fontUrls.push(`/assets/${name}`);
    fontFaces.push(
      `@font-face{font-family:'${family}';src:url('/assets/${name}') format('woff2');font-style:normal;font-weight:${weight};font-display:swap}`,
    );
  }
  const fontCss = `${fontFaces.join("\n")}\n:root{--font-geist-sans:'Geist Sans',Arial,sans-serif;--font-geist-mono:'Geist Mono',monospace;--font-geist-pixel-circle:'Geist Pixel Circle','Geist Mono',monospace}`;
  const css = await postcss([tailwindcss({ optimize: true })]).process(
    await readFile(resolve(root, "src/app/globals.css"), "utf8"),
    { from: resolve(root, "src/app/globals.css") },
  );
  const stylesheet = `${fontCss}\n${css.css}`;
  const cssUrl = `/assets/site-${hash(stylesheet)}.css`;
  await Bun.write(resolve(staticDir, `.${cssUrl}`), stylesheet);

  const browser = await Bun.build({
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
    entrypoints: [resolve(root, "src/client.tsx")],
    minify: true,
    naming: { chunk: "chunk-[hash].[ext]", entry: "[name]-[hash].[ext]" },
    outdir: assets,
    splitting: true,
    target: "browser",
  });
  if (!browser.success) {
    throw new AggregateError(browser.logs, "Browser build failed");
  }
  const entry = browser.outputs.find((file) => file.kind === "entry-point");
  if (!entry) {
    throw new Error("Browser entry point was not emitted");
  }
  const scriptUrl = `/assets/${entry.path.split("/").at(-1)}`;

  for (const [pageId, { load, pathname }] of Object.entries(pages)) {
    const { default: Page } = await load();
    for (const language of SUPPORTED_LANGUAGES) {
      const metadata = pageMetadata(pageId as keyof typeof pages, language);
      const url = `${SITE_URL}${withLanguagePrefix(language, pathname)}`;
      const head = renderToStaticMarkup(
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>{metadata.title}</title>
          <meta content={metadata.description} name="description" />
          <meta
            content={
              pageId === "404"
                ? "noindex"
                : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            }
            name="robots"
          />
          <link href={url} rel="canonical" />
          {SUPPORTED_LANGUAGES.map((locale) => (
            <link
              href={`${SITE_URL}${withLanguagePrefix(locale, pathname)}`}
              hrefLang={locale}
              key={locale}
              rel="alternate"
            />
          ))}
          <meta content={metadata.title} property="og:title" />
          <meta content={metadata.description} property="og:description" />
          <meta content={url} property="og:url" />
          <meta content="website" property="og:type" />
          <meta content="Uwe Schwarz" property="og:site_name" />
          <meta content={language === "de" ? "de_DE" : "en_US"} property="og:locale" />
          <meta content={`${SITE_URL}/profile.webp`} property="og:image" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="@e38383" name="twitter:creator" />
          <meta content={metadata.title} name="twitter:title" />
          <meta content={metadata.description} name="twitter:description" />
          <meta content={`${SITE_URL}/profile.webp`} name="twitter:image" />
          <meta content="same-origin" name="view-transition" />
          <link href="/us.svg" rel="icon" type="image/svg+xml" />
          <link href={cssUrl} rel="stylesheet" />
          {fontUrls
            .filter((_, index) => index !== 1)
            .map((href) => (
              <link as="font" crossOrigin="anonymous" href={href} key={href} rel="preload" type="font/woff2" />
            ))}
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
          {pageId !== "404" && <script dangerouslySetInnerHTML={{ __html: languageInitScript }} />}
          <script src={scriptUrl} type="module" />
          <script defer src="/_vercel/insights/script.js" />
        </head>,
      );
      const body = renderToString(
        <PageFrame language={language} pathname={pathname}>
          <Page />
        </PageFrame>,
      );
      const html = `<!DOCTYPE html><html lang="${language}" data-page="${pageId}" data-pathname="${pathname}" data-scroll-behavior="smooth">${head}<body class="min-h-screen bg-background font-sans antialiased text-foreground"><div id="site-root">${body}</div></body></html>`;
      const localized = withLanguagePrefix(language, pathname);
      await mkdir(resolve(staticDir, `.${localized}`), { recursive: true });
      await Bun.write(resolve(staticDir, `.${localized}/index.html`), html);
      if (language === "en") {
        const alias =
          pageId === "404" ? resolve(staticDir, "404.html") : resolve(staticDir, `.${pathname}`, "index.html");
        await mkdir(resolve(alias, ".."), { recursive: true });
        await Bun.write(alias, html);
      }
    }
  }

  const functionDir = resolve(output, "functions/api/send-mail.func");
  const mail = await Bun.build({
    entrypoints: [resolve(root, "src/server/vercel-mail.ts")],
    format: "esm",
    minify: true,
    naming: "index.mjs",
    outdir: functionDir,
    packages: "bundle",
    target: "node",
  });
  if (!mail.success) {
    throw new AggregateError(mail.logs, "Mail function build failed");
  }
  await Bun.write(
    resolve(functionDir, ".vc-config.json"),
    JSON.stringify({ handler: "index.mjs", launcherType: "Nodejs", maxDuration: 30, runtime: "nodejs24.x" }),
  );

  const hashes = [themeInitScript, languageInitScript].map(
    (source) => `'sha256-${createHash("sha256").update(source).digest("base64")}'`,
  );
  const headers = {
    "Content-Security-Policy": `default-src 'self'; script-src 'self' ${hashes.join(" ")}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; frame-src 'self'; manifest-src 'self'; upgrade-insecure-requests`,
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
  };
  const routes: Array<Record<string, unknown>> = [
    { continue: true, headers, src: "/(.*)" },
    {
      continue: true,
      headers: {
        "Content-Security-Policy": headers["Content-Security-Policy"].replace(
          "frame-ancestors 'none'",
          "frame-ancestors 'self'",
        ),
      },
      src: String.raw`/(.*\.pdf)`,
    },
    { continue: true, headers: { "Cache-Control": "public, max-age=31536000, immutable" }, src: "/assets/(.*)" },
    { continue: true, headers: { Link: AGENT_DISCOVERY_LINKS.join(", "), Vary: "Accept" }, src: "/(?:de|en)?/?" },
  ];
  const markdownDir = resolve(output, "functions/api/agent-markdown.func");
  const markdownBuild = await Bun.build({
    entrypoints: [resolve(root, "src/server/vercel-markdown.ts")],
    format: "esm",
    minify: true,
    naming: "index.mjs",
    outdir: markdownDir,
    packages: "bundle",
    target: "node",
  });
  if (!markdownBuild.success) {
    throw new AggregateError(markdownBuild.logs, "Markdown function build failed");
  }
  await Bun.write(
    resolve(markdownDir, ".vc-config.json"),
    JSON.stringify({ handler: "index.mjs", launcherType: "Nodejs", maxDuration: 10, runtime: "nodejs24.x" }),
  );
  for (const language of SUPPORTED_LANGUAGES) {
    const markdown = buildHomepageMarkdown(language);
    await Bun.write(resolve(staticDir, `${language}/index.md`), markdown);
    await Bun.write(resolve(markdownDir, `pages/${language}.md`), markdown);
    await cp(resolve(staticDir, `${language}/index.html`), resolve(markdownDir, `pages/${language}.html`));
  }
  routes.push(
    {
      dest: "/api/agent-markdown?negotiate=1&lang=$1",
      has: [{ key: "accept", type: "header", value: ".*[tT][eE][xX][tT]/[mM][aA][rR][kK][dD][oO][wW][nN].*" }],
      src: "/(de|en)?/?",
    },
    {
      locale: { cookie: "language", redirect: { de: "/de/$1", en: "/en/$1" } },
      src: "/(cv|imprint|privacy|sitemap)?/?",
    },
    { dest: "/$1/index.html", src: "/(de|en)/?" },
    { dest: "/$1/$2/index.html", src: "/(de|en)/(cv|imprint|privacy|sitemap|404)/?" },
    { handle: "filesystem" },
    { dest: "/$1/404/index.html", src: "/(de|en)/(.*)", status: 404 },
    { dest: "/404.html", src: "/(.*)", status: 404 },
  );
  await Bun.write(
    resolve(output, "config.json"),
    JSON.stringify(
      {
        routes: routes.map((route) => (typeof route.src === "string" ? { ...route, src: `^${route.src}$` } : route)),
        version: 3,
      },
      null,
      2,
    ),
  );
  console.log(
    `Built ${SUPPORTED_LANGUAGES.length * Object.keys(pages).length} static pages and two dependency-free functions (mail and Markdown negotiation).`,
  );
}

if (import.meta.main) {
  await buildSite();
}
