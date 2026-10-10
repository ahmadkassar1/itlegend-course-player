import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ignore from "ignore";

// This local evidence tool does not upload, link or create a remote project.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const git = (...args) =>
  execFileSync(
    "git",
    ["-c", `safe.directory=${root.replaceAll(path.sep, "/")}`, ...args],
    {
      cwd: root,
      maxBuffer: 16 * 1024 * 1024,
    },
  );
const revision = git("rev-parse", "HEAD").toString().trim();
const exclusions = ignore().add(
  git("show", `${revision}:.vercelignore`).toString(),
);
const entries = git("ls-tree", "-rz", "--full-tree", revision)
  .toString()
  .split("\0")
  .filter(Boolean)
  .map((entry) => {
    const [metadata, name] = entry.split("\t");
    const [mode, type] = metadata.split(" ");
    assert(type === "blob" && /^100(644|755)$/.test(mode), name);
    assert(!path.isAbsolute(name) && !name.split("/").includes(".."), name);
    return name;
  });
const included = entries.filter((name) => !exclusions.ignores(name));
const excluded = entries.filter((name) => exclusions.ignores(name));
for (const required of [
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json",
  "src/app/layout.tsx",
  "src/app/courses/[slug]/page.tsx",
  "src/data/demo-community.ts",
  "public/images/learner.svg",
  "public/resources/learning-plan.pdf",
  "public/resources/learning-plan.png",
  "src/app/fonts/poppins-regular.woff2",
  "src/app/fonts/poppins-medium.woff2",
  "src/app/fonts/poppins-semibold.woff2",
  "src/app/fonts/spartan-variable.woff2",
]) {
  assert(included.includes(required), `Missing active file: ${required}`);
}
for (const name of included) {
  assert(
    !/^(?:\.env|\.git\/|\.vercel\/|verification\/|tests\/|scripts\/|public\/media\/)/.test(
      name,
    ),
    `Excluded path in candidate: ${name}`,
  );
}
assert(!included.includes("src/data/course-content.json"));

const candidate = path.join(
  root,
  "verification",
  `local-publication-candidate-20261010-${revision.slice(0, 7)}`,
  "source",
);
await fs.mkdir(candidate, { recursive: true });
const files = [];
for (const name of included.sort()) {
  const destination = path.resolve(candidate, name);
  assert(destination.startsWith(candidate + path.sep));
  const data = git("show", `${revision}:${name}`);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, data, { flag: "wx" });
  files.push({
    path: name,
    bytes: data.length,
    sha256: createHash("sha256").update(data).digest("hex"),
  });
}
const manifest = {
  checkedAt: new Date().toISOString(),
  sourceCommit: revision,
  runtimeCommit: "a4d26f0132686025dc9343280f652ed810f3cddd",
  testedBuild: "4VO7Kr1kvzGtGqb6WdXBr",
  scope:
    "Exact committed app bytes filtered using .vercelignore; local candidate only, no upload or hosted build.",
  candidate: path.relative(root, candidate).replaceAll(path.sep, "/"),
  fileCount: files.length,
  totalBytes: files.reduce((total, file) => total + file.bytes, 0),
  files,
  excluded,
};
await fs.writeFile(
  path.join(root, "verification/publication-20261010-release-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  JSON.stringify({
    revision,
    fileCount: manifest.fileCount,
    totalBytes: manifest.totalBytes,
    candidate: manifest.candidate,
  }),
);
