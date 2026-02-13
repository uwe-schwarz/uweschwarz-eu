import nkzw from "@nkzw/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [nkzw],
  rules: {
    "@typescript-eslint/no-require-imports": "error",
    "import/no-namespace": "off",
    "no-console": "off",
    "no-undef": "error",
    "perfectionist/sort-object-types": "off",
    "perfectionist/sort-objects": "off",
    "unicorn/catch-error-name": "error",
    "unicorn/consistent-function-scoping": "error",
    "unicorn/prefer-optional-catch-binding": "error",
    "unicorn/prefer-top-level-await": "error",
  },
});
