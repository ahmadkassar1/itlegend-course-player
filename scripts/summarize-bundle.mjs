import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const directory = ".next/diagnostics/analyze/data";
const routes = [
  ["/", "analyze.data"],
  ["/courses/[slug]", "courses/[slug]/analyze.data"],
];
const report = {
  capturedAt: new Date().toISOString(),
  nextVersion: JSON.parse(
    await readFile("node_modules/next/package.json", "utf8"),
  ).version,
  command:
    "next experimental-analyze --output; node scripts/summarize-bundle.mjs",
  limitations:
    "Experimental analyzer performs its own compile, not a deployable build. Module-part sizes are not network bytes and chunk identities can differ from the measured production build. Includes async and nomodule output; runtime request evidence is separate.",
  routes: [],
};

for (const [route, file] of routes) {
  const bytes = await readFile(join(directory, file));
  // Internal Next 16.3.8 format: big-endian header length, JSON, binary indexes.
  // Fail visibly if upstream changes it; do not silently guess module sizes.
  const data = JSON.parse(
    bytes.subarray(4, 4 + bytes.readUInt32BE(0)).toString(),
  );
  if (!data.sources || !data.chunk_parts || !data.output_files)
    throw new Error("Unsupported Next bundle-analysis format");
  function sourcePath(index) {
    const source = data.sources[index];
    return `${source.parent_source_index == null ? "" : sourcePath(source.parent_source_index)}/${source.path}`.replaceAll(
      /\/{2,}/g,
      "/",
    );
  }
  const modules = {};
  const outputs = {};
  for (const part of data.chunk_parts) {
    const output = data.output_files[part.output_file_index].filename;
    if (!output.startsWith("[client-fs]") || !output.endsWith(".js")) continue;
    const path = sourcePath(part.source_index);
    modules[path] = (modules[path] || 0) + part.size;
    outputs[output] = (outputs[output] || 0) + part.size;
  }
  report.routes.push({
    route,
    clientJavaScriptModuleParts: Object.fromEntries(
      Object.entries(modules).sort((a, b) => b[1] - a[1]),
    ),
    clientJavaScriptOutputModulePartBytes: outputs,
  });
}
await writeFile(
  process.argv[2] || "verification/local-bundle-analysis.json",
  `${JSON.stringify(report, null, 2)}\n`,
);
