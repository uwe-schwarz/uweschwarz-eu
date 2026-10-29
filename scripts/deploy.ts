import { resolve } from "node:path";

process.chdir(resolve(import.meta.dir, ".."));
const vercel = Bun.which("vercel");
if (!vercel) {
  throw new Error("Local deployment requires the host's installed and authenticated Vercel CLI.");
}
function run(command: Array<string>) {
  const result = Bun.spawnSync(command, { stderr: "inherit", stdout: "inherit" });
  if (result.exitCode !== 0) {
    process.exit(result.exitCode);
  }
}
run([process.execPath, "run", "deps:update"]);
run([process.execPath, "run", "check"]);
const dirty = Bun.spawnSync([
  "git",
  "status",
  "--porcelain",
  "--untracked-files=normal",
  "--",
  "src",
  "public",
  "scripts",
  "package.json",
  "bun.lock",
  "bunfig.toml",
  "vercel.json",
  "tailwind.config.ts",
  "tsconfig.json",
  "postcss.config.js",
  ".husky",
  "oxlint.config.ts",
  ".oxfmtrc.json",
  "doctor.config.json",
]);
if (dirty.exitCode !== 0 || dirty.stdout.length > 0) {
  throw new Error("Review and commit the updated source, dependencies and generated assets before deploying.");
}
run([vercel, "deploy", "--prebuilt", "--prod", ...process.argv.slice(2)]);
