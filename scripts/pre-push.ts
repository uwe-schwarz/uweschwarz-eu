import { resolve } from "node:path";

process.chdir(resolve(import.meta.dir, ".."));
const input = await Bun.stdin.text();
const refs = input
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(" "));
const outgoing = refs.filter(([, sha]) => !/^0+$/.test(sha));
if (outgoing.length === 0) {
  process.exit(0);
}

function run(command: Array<string>) {
  const result = Bun.spawnSync(command, { stderr: "inherit", stdout: "inherit" });
  if (result.exitCode !== 0) {
    process.exit(result.exitCode);
  }
}

const head = Bun.spawnSync(["git", "rev-parse", "HEAD"], { stdout: "pipe" }).stdout.toString().trim();
if (outgoing.some(([, sha]) => sha !== head)) {
  throw new Error("Push the checked-out HEAD so dependency validation covers the outgoing source.");
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
  ".husky",
  "package.json",
  "bun.lock",
  "bunfig.toml",
  "vercel.json",
  "tailwind.config.ts",
  "tsconfig.json",
  "postcss.config.js",
  "oxlint.config.ts",
  ".oxfmtrc.json",
  "doctor.config.json",
]);
if (dirty.exitCode !== 0 || dirty.stdout.length > 0) {
  throw new Error(
    "Source, dependencies or generated assets differ from HEAD. Review and commit them, then push again. Nothing was committed or pushed automatically.",
  );
}
