import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

const root = join(import.meta.dir, "../..");
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const providersSource = readFileSync(join(import.meta.dir, "providers.client.tsx"), "utf8");

describe("runtime dependency cleanup", () => {
  test("keeps only providers that have consumers", () => {
    expect(providersSource).toContain("SettingsProvider");
    expect(providersSource).toContain("<Toaster />");
    expect(providersSource).not.toContain("@tanstack/react-query");
    expect(providersSource).not.toContain("QueryClient");
    expect(providersSource).not.toContain("TooltipProvider");
    expect(providersSource).not.toContain("@/components/ui/sonner");
    expect(providersSource).not.toContain("<Sonner />");
  });

  test("removes unused runtime packages and classifies CV generators as development tools", () => {
    expect(packageJson.dependencies).not.toHaveProperty("@tanstack/react-query");
    expect(packageJson.dependencies).not.toHaveProperty("@radix-ui/react-tooltip");
    expect(packageJson.dependencies).not.toHaveProperty("sonner");
    expect(packageJson.dependencies).not.toHaveProperty("@react-pdf/renderer");
    expect(packageJson.dependencies).not.toHaveProperty("docx");
    expect(packageJson.devDependencies).toHaveProperty("@react-pdf/renderer");
    expect(packageJson.devDependencies).toHaveProperty("docx");
    expect(packageJson.devDependencies).not.toHaveProperty("autoprefixer");
    expect(packageJson.devDependencies).not.toHaveProperty("eslint-plugin-no-only-tests");
    expect(packageJson.devDependencies).not.toHaveProperty("eslint-plugin-perfectionist");
    expect(packageJson.devDependencies).not.toHaveProperty("eslint-plugin-react-hooks");
    expect(packageJson.devDependencies).not.toHaveProperty("eslint-plugin-unused-imports");
    expect(packageJson.dependencies).not.toHaveProperty("react-icons");
  });

  test("deletes wrappers for removed UI providers", () => {
    expect(existsSync(join(root, "src/components/ui/sonner.tsx"))).toBe(false);
    expect(existsSync(join(root, "src/components/ui/tooltip.tsx"))).toBe(false);
  });
});
