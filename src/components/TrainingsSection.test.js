import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { describe, expect, test } from "bun:test";

const trainingsSectionSource = readFileSync(new URL("./TrainingsSection.tsx", import.meta.url), "utf8");

describe("TrainingsSection", () => {
  test("hides the decorative training icon from assistive tech", () => {
    expect(trainingsSectionSource).toContain('<Icon aria-hidden="true" className="h-6 w-6" />');
    expect(trainingsSectionSource).toContain("?? GraduationCap");
  });

  test("does not render training dates", () => {
    expect(trainingsSectionSource).not.toContain("CalendarDaysIcon");
    expect(trainingsSectionSource).not.toContain("training.date");
  });

  test("uses a responsive three-column desktop grid", () => {
    expect(trainingsSectionSource).toContain('className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"');
  });

  test("accepts a React 19 ref prop while preserving an explicit display name", () => {
    expect(trainingsSectionSource).toContain("ref?: Ref<HTMLElement>;");
    expect(trainingsSectionSource).toContain("ref={ref}");
    expect(trainingsSectionSource).toContain('TrainingsSection.displayName = "TrainingsSection";');
  });
});
