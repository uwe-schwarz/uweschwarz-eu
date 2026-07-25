import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { describe, expect, test } from "bun:test";

const globalsSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const homePageSource = readFileSync(new URL("../app/[lang]/page.tsx", import.meta.url), "utf8");
const aboutSource = readFileSync(new URL("./AboutSection.tsx", import.meta.url), "utf8");
const experienceSource = readFileSync(new URL("./ExperienceSection.tsx", import.meta.url), "utf8");
const projectsSource = readFileSync(new URL("./ProjectsSection.tsx", import.meta.url), "utf8");
const skillsSource = readFileSync(new URL("./SkillsSection.tsx", import.meta.url), "utf8");
const trainingsSource = readFileSync(new URL("./TrainingsSection.tsx", import.meta.url), "utf8");

describe("section backgrounds", () => {
  test("uses one continuous aurora behind softly separated sections", () => {
    expect(globalsSource).toContain(".bg-aurora");
    expect(globalsSource).toContain(".site-aurora-background");
    expect(globalsSource).toContain(".site-aurora-veil");
    expect(globalsSource).toContain(".section-muted-blend");
    expect(globalsSource).toContain("hsl(var(--muted) / 0.4)");
    expect(homePageSource).toContain('<div aria-hidden="true" className="site-aurora-background" />');
    expect(homePageSource).toContain('<div aria-hidden="true" className="site-aurora-veil" />');
    expect(aboutSource).not.toContain("bg-aurora");
    expect(experienceSource).not.toContain("bg-aurora");
    expect(trainingsSource).toContain("section-muted-blend");
    expect(projectsSource).toContain("section-muted-blend");
    expect(skillsSource).not.toContain("bg-aurora");
    expect(trainingsSource).not.toContain("section-padding bg-muted/40");
    expect(projectsSource).not.toContain("section-padding bg-muted/40");
  });
});
