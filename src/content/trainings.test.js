import { describe, expect, test } from "bun:test";
import { siteContent } from "./content";

describe("training content", () => {
  test("contains no dates and includes the MLOps training in both languages", () => {
    expect(siteContent.trainings.items).toHaveLength(3);
    expect(siteContent.trainings.items.every((training) => !("date" in training))).toBe(true);

    const mlopsTraining = siteContent.trainings.items.find(
      (training) => training.title.de === "MLOps, Monitoring, Kostenkontrolle",
    );

    expect(mlopsTraining).toBeDefined();
    expect(mlopsTraining?.title.en).toBe("MLOps, Monitoring & Cost Control");
    expect(mlopsTraining?.description.de).toBeTruthy();
    expect(mlopsTraining?.description.en).toBeTruthy();
  });
});
