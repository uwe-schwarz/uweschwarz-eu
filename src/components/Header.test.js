import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { describe, expect, test } from "bun:test";

const headerSource = readFileSync(new URL("./Header.tsx", import.meta.url), "utf8");

describe("Header", () => {
  test("expands the liquid glass SVG filter bounds", () => {
    expect(headerSource).toContain('x="-30%"');
    expect(headerSource).toContain('y="-30%"');
    expect(headerSource).toContain('width="160%"');
    expect(headerSource).toContain('height="160%"');
  });

  test("marks the active desktop navigation item for assistive tech", () => {
    expect(headerSource.match(/aria-current=\{isActive \? "page" : undefined\}/g)).toHaveLength(2);
  });
});
