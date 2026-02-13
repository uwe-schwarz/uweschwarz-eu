import nkzw from "@nkzw/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [nkzw],
  rules: {
    "import/no-namespace": "error",
    "no-console": "off",
  },
});
