import { describe, expect, test } from "bun:test";

import { formatLocalDateStamp } from "./cvAssetDates";

describe("cvAssetDates", () => {
  test("formats asset dates from local calendar components instead of UTC", () => {
    const localDate = new Date(2026, 3, 1, 0, 30, 0, 0);

    expect(formatLocalDateStamp(localDate)).toBe("2026-04-01");
  });
});
