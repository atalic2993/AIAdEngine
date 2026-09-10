import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scanDirectories = ["app", "components", "lib"];

const forbidden = [
  { pattern: /30[- ]minute/i, reason: "Demo must be described as 15 minutes" },
  { pattern: /roughly 6 months/i, reason: "Polvytjie timeframe is not approved" },
  { pattern: /steady optimisation took Polvytjie/i, reason: "Polvytjie causation is not approved" },
  { pattern: /Stop boosting posts/i, reason: "Old Meta-only hero positioning" },
  { pattern: />\s*Get started\s*</i, reason: "Use an outcome-specific call to action" },
];

function isLegalFile(filePath) {
  return filePath.split(path.sep).some((part) => {
    const name = part.toLowerCase();
    return (
      name === "legal" ||
      name.startsWith("privacy") ||
      name.startsWith("terms") ||
      name.startsWith("refund")
    );
  });
}

function collectSourceFiles(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(entryPath));
    } else if (/\.tsx?$/.test(entry.name) && !isLegalFile(entryPath)) {
      files.push(entryPath);
    }
  }

  return files;
}

const matches = [];

for (const directory of scanDirectories) {
  const directoryPath = path.join(root, directory);

  if (!fs.existsSync(directoryPath)) continue;

  for (const filePath of collectSourceFiles(directoryPath)) {
    const source = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(root, filePath).split(path.sep).join("/");

    for (const { pattern, reason } of forbidden) {
      const globalPattern = new RegExp(pattern.source, `${pattern.flags}g`);

      for (const match of source.matchAll(globalPattern)) {
        const line = source.slice(0, match.index).split(/\r?\n/).length;
        matches.push(`${relativePath}:${line} ${reason}`);
      }
    }
  }
}

if (matches.length > 0) {
  console.error(matches.join("\n"));
  process.exitCode = 1;
}
