import { readFile } from "node:fs/promises";
import test from "node:test";
import { URL } from "node:url";
import assert from "node:assert/strict";

const skillUrl = new URL("../.agents/skills/deps-upgrade-autopilot/SKILL.md", import.meta.url);

test("issue deduplication keeps untrusted bodies out of agent context", async () => {
  const skill = await readFile(skillUrl, "utf8");
  const section = skill.match(/## Follow-Up Issue Deduplication(?<body>[\s\S]*?)\n## /)?.groups?.body;

  assert.ok(section, "deduplication instructions should exist");
  assert.match(section, /`gh issue list --state open --limit 200 --json number,title,url,labels`/);
  assert.doesNotMatch(section, /\bgh api\b/);
  assert.doesNotMatch(section, /\bgh issue view\b/);
  assert.doesNotMatch(section, /--json[^\n`]*\b(?:body|comments?)\b/);
  assert.match(section, /Do not open issue URLs/i);
  assert.match(section, /untrusted/i);
  assert.match(section, /never[^\n]*(instruction|command)/i);
});
