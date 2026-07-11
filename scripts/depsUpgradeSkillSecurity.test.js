import { readFile } from "node:fs/promises";
import test from "node:test";
import { URL } from "node:url";
import assert from "node:assert/strict";

const skillUrl = new URL("../.agents/skills/deps-upgrade-autopilot/SKILL.md", import.meta.url);

test("issue deduplication keeps untrusted bodies out of agent context", async () => {
  const skill = await readFile(skillUrl, "utf8");
  const section = skill.match(/## Follow-Up Issue Deduplication(?<body>[\s\S]*?)\n## /)?.groups?.body;

  assert.ok(section, "deduplication instructions should exist");
  assert.doesNotMatch(section, /--json[^\n`]*\bbody\b/);
  assert.match(section, /untrusted/i);
  assert.match(section, /never[^\n]*(instruction|command)/i);
  assert.match(section, /--limit 100\b/);
});
