import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

const pageSource = readFileSync(join(import.meta.dir, "page.tsx"), "utf8");

describe("localized homepage composition", () => {
  test("composes section client boundaries directly from the server page", () => {
    for (const component of [
      "Header",
      "HeroSection",
      "AboutSection",
      "TrainingsSection",
      "ExperienceSection",
      "ProjectsSection",
      "SkillsSection",
      "ContactSection",
      "Footer",
    ]) {
      expect(pageSource).toContain(`import ${component} from`);
      expect(pageSource).toContain(`<${component} />`);
    }

    expect(pageSource).toContain('<div className="flex min-h-screen flex-col">');
    expect(pageSource).toContain('<main className="grow">');
    expect(pageSource).not.toContain("ClientComponents");
    expect(existsSync(join(import.meta.dir, "client-components.tsx"))).toBe(false);
  });
});
