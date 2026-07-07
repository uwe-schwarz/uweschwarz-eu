import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { describe, expect, test } from "bun:test";

const trainingsSectionSource = readFileSync(new URL("./TrainingsSection.tsx", import.meta.url), "utf8");

describe("TrainingsSection", () => {
  test("hides decorative training icons from assistive tech", () => {
    expect(trainingsSectionSource).toContain('<GraduationCap aria-hidden="true" className="h-6 w-6" />');
    expect(trainingsSectionSource).toContain('<CalendarDaysIcon aria-hidden="true" size={14} />');
  });

  test("accepts a React 19 ref prop while preserving an explicit display name", () => {
    expect(trainingsSectionSource).toContain("ref?: Ref<HTMLElement>;");
    expect(trainingsSectionSource).toContain("ref={ref}");
    expect(trainingsSectionSource).toContain('TrainingsSection.displayName = "TrainingsSection";');
  });
});
