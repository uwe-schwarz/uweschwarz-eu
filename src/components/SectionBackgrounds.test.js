import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { describe, expect, test } from "bun:test";

const globalsSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const homePageSource = readFileSync(new URL("../app/[lang]/page.tsx", import.meta.url), "utf8");
const sectionSources = ["About", "Projects", "Experience", "Trainings", "Skills", "Contact"].map((name) =>
  readFileSync(new URL(`./${name}Section.tsx`, import.meta.url), "utf8"),
);

describe("section backgrounds", () => {
  test("draws one continuous blueprint grid behind the whole homepage", () => {
    expect(globalsSource).toContain(".blueprint-grid");
    expect(globalsSource).toContain("--grid-minor");
    expect(globalsSource).toContain("--grid-major");
    expect(homePageSource).toContain(
      '<div aria-hidden="true" className="blueprint-grid pointer-events-none absolute inset-0 -z-10" />',
    );
  });

  test("keeps sections transparent so the grid runs through them", () => {
    for (const source of sectionSources) {
      expect(source).toContain("section-space");
      expect(source).not.toContain("blueprint-grid");
      expect(source).not.toMatch(/<section className="[^"]*\bbg-/);
    }
  });

  test("defines light and dark tokens for the plan surfaces", () => {
    expect(globalsSource).toMatch(/:root \{[^}]*--redline:/s);
    expect(globalsSource).toMatch(/\.dark \{[^}]*--redline:/s);
    expect(globalsSource).toMatch(/\.dark \{[^}]*--print:/s);
  });
});
