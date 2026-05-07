import { describe, expect, test } from "bun:test";

import { closeWithTimeout, markVisualRegressionDocument, TARGETS } from "./deps-visual-check.mjs";

describe("deps visual capture targets", () => {
  test("captures the CV page with a page screenshot instead of a body locator", () => {
    const cvTarget = TARGETS.find((target) => target.id === "cv");

    expect(cvTarget).toMatchObject({
      capture: "page",
      id: "cv",
    });
  });
});

describe("closeWithTimeout", () => {
  test("clears the cleanup timer when close resolves first", async () => {
    const originalSetTimeout = globalThis.setTimeout;
    const originalClearTimeout = globalThis.clearTimeout;
    const timer = Symbol("timer");
    const clearedTimers = [];

    globalThis.setTimeout = (callback) => {
      return timer;
    };
    globalThis.clearTimeout = (timeout) => {
      clearedTimers.push(timeout);
    };

    try {
      await closeWithTimeout({
        close: async () => {},
      });
    } finally {
      globalThis.setTimeout = originalSetTimeout;
      globalThis.clearTimeout = originalClearTimeout;
    }

    expect(clearedTimers).toEqual([timer]);
  });
});

describe("markVisualRegressionDocument", () => {
  test("sets the document marker used by stable visual captures", () => {
    const documentRef = {
      documentElement: {
        dataset: {},
      },
    };

    markVisualRegressionDocument(documentRef);

    expect(documentRef.documentElement.dataset.visualRegression).toBe("true");
  });
});
