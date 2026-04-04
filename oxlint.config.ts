import nkzw from "@nkzw/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [".agents/**"],
  overrides: [
    {
      files: ["scripts/**/*.ts"],
      rules: {
        "no-console": "off",
      },
    },
  ],
  rules: {
    "no-console": ["error", { allow: ["error", "warn"] }],
  },
});
