import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { supportsMinimumReleaseAge } from "./check-bun-version.mjs";

const root = resolve(import.meta.dir, "..");
process.chdir(root);

function run(command: Array<string>) {
  const result = Bun.spawnSync(command, { stderr: "inherit", stdout: "inherit" });
  if (result.exitCode !== 0) {
    throw new Error(`${command.join(" ")} failed`);
  }
}

if (process.env.CI || process.env.VERCEL) {
  throw new Error("Dependency updates run locally. Deployment builders must use the committed frozen lockfile.");
}
const gitDirResult = Bun.spawnSync(["git", "rev-parse", "--git-path", "dependency-maintenance"], { stdout: "pipe" });
if (gitDirResult.exitCode !== 0) {
  throw new Error("Dependency maintenance requires a Git checkout");
}
const stateDir = resolve(root, gitDirResult.stdout.toString().trim());
await mkdir(stateDir, { recursive: true });
const lock = resolve(stateDir, "lock");
try {
  await writeFile(lock, String(process.pid), { flag: "wx" });
} catch {
  const pid = Number(await readFile(lock, "utf8"));
  let running = true;
  try {
    process.kill(pid, 0);
  } catch {
    running = false;
  }
  if (running) {
    throw new Error("Another local dependency update is running. Retry after it finishes.");
  }
  await rm(lock);
  await writeFile(lock, String(process.pid), { flag: "wx" });
}
try {
  if (!supportsMinimumReleaseAge(Bun.version)) {
    throw new Error("Install a stable Bun version supporting minimumReleaseAge before updating dependencies.");
  }
  const currentManifest = await Bun.file("package.json").json();
  if (currentManifest.packageManager !== `bun@${Bun.version}`) {
    currentManifest.packageManager = `bun@${Bun.version}`;
    await Bun.write("package.json", `${JSON.stringify(currentManifest, null, 2)}\n`);
  }
  run(["node", "scripts/check-bun-version.mjs"]);
  run([process.execPath, "update", "--latest"]);
  const manifest = await Bun.file("package.json").json();
  const versions: Record<string, string> = {};
  for (const name of Object.keys(manifest.devDependencies)) {
    const installed = await Bun.file(resolve(root, "node_modules", name, "package.json")).json();
    versions[name] = installed.version;
    for (const [peer, range] of Object.entries(installed.peerDependencies ?? {})) {
      if (!manifest.devDependencies[peer]) {
        continue;
      }
      const peerManifest = await Bun.file(resolve(root, "node_modules", peer, "package.json")).json();
      if (!Bun.semver.satisfies(peerManifest.version, String(range))) {
        throw new Error(
          `${name}@${installed.version} requires ${peer}@${range}, but ${peerManifest.version} is installed. Resolve the compatible versions before pushing or deploying.`,
        );
      }
    }
  }
  await Bun.write(
    resolve(stateDir, "updates.json"),
    JSON.stringify({ minimumReleaseAgeSeconds: 259_200, updatedAt: new Date().toISOString(), versions }, null, 2),
  );
  console.log(
    "Local dependencies are at the latest eligible stable versions. Commit package.json and bun.lock when changed.",
  );
} finally {
  await rm(lock, { force: true });
}
