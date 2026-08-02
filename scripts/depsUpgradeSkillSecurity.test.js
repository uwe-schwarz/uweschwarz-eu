import { readFile } from "node:fs/promises";
import test from "node:test";
import { URL } from "node:url";
import assert from "node:assert/strict";

const autopilotSkillUrl = new URL("../.agents/skills/deps-upgrade-autopilot/SKILL.md", import.meta.url);
const baseSkillUrl = new URL("../.agents/skills/upgrade-dependencies-pr/SKILL.md", import.meta.url);
const packageManagerPlaybookUrl = new URL(
  "../.agents/skills/upgrade-dependencies-pr/references/package-manager-playbook.md",
  import.meta.url,
);

test("issue deduplication keeps untrusted bodies out of agent context", async () => {
  const skill = await readFile(autopilotSkillUrl, "utf8");
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

test("Bun upgrades normalize lockfile specifiers before validation", async () => {
  const [autopilotSkill, baseSkill, packageManagerPlaybook] = await Promise.all([
    readFile(autopilotSkillUrl, "utf8"),
    readFile(baseSkillUrl, "utf8"),
    readFile(packageManagerPlaybookUrl, "utf8"),
  ]);
  const bunSection = packageManagerPlaybook.match(/## Bun(?<body>[\s\S]*?)\n## uv/)?.groups?.body;

  assert.ok(bunSection, "Bun package-manager instructions should exist");
  assert.match(bunSection, /bun update --latest\nbun install/g);
  assert.match(bunSection, /`bun install` step is mandatory/i);
  assert.match(bunSection, /Do not stage, validate, or commit[^\n]*between the update and install/i);
  assert.match(baseSkill, /always run `bun install` immediately after `bun update --latest`/i);
  assert.match(baseSkill, /before any diff is staged or validated/i);
  assert.match(autopilotSkill, /immediately run `bun install` before inspecting or staging the diff/i);
  assert.match(autopilotSkill, /no-`latest` checker afterward and stop if it fails/i);
});
