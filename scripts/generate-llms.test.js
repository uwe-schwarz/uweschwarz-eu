import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

import { buildLlmsTxt } from "./generate-llms";

const root = join(import.meta.dir, "..");
const llmsTxt = readFileSync(join(root, "public/llms.txt"), "utf8");

function expectRecommendedLlmsTxtFormat(content) {
  expect(content).toMatch(/^# [^#\n]+\n\n> \S/);
  expect(content.match(/^# /gm)).toHaveLength(1);

  const links = [...content.matchAll(/^- \[[^\]]+\]\(https:\/\/[^)]+\)(?:: .+)?$/gm)];
  expect(links.length).toBeGreaterThan(0);

  const sections = content.split(/^## /m).slice(1);
  expect(sections.length).toBeGreaterThan(0);

  for (const section of sections) {
    const [, ...bodyLines] = section.split("\n");
    const entries = bodyLines.filter(Boolean);

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((line) => /^- \[[^\]]+\]\(https:\/\/[^)]+\)(?:: .+)?$/.test(line))).toBe(true);
  }
}

describe("generated llms.txt", () => {
  test("follows the llms.txt recommendation and contains Markdown resource links", () => {
    expectRecommendedLlmsTxtFormat(llmsTxt);
    expect(llmsTxt).toContain("[English portfolio](https://uweschwarz.eu/api/agent-markdown?lang=en)");
    expect(llmsTxt).toContain("[German portfolio](https://uweschwarz.eu/api/agent-markdown?lang=de)");
  });

  test("matches the generator output", () => {
    const generatedOn = llmsTxt.match(/Last generated: (\d{4}-\d{2}-\d{2})\./)?.[1];

    expect(generatedOn).toBeDefined();
    expect(llmsTxt).toBe(buildLlmsTxt(generatedOn));
  });
});
