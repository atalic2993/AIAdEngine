// Builds a ready-to-upload folder for any Node host (HostAfrica, VPS, etc).
// Run: npm run package
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "deploy");
const standalone = path.join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error("No .next/standalone found. Run `npm run build` first.");
  process.exit(1);
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

// 1. The server plus the trimmed node_modules Next produced.
await cp(standalone, out, { recursive: true });
// 2. Static assets and the public folder are not copied by Next itself.
await cp(path.join(root, ".next", "static"), path.join(out, ".next", "static"), { recursive: true });
await cp(path.join(root, "public"), path.join(out, "public"), { recursive: true });

// 3. Entry point some panels expect (Passenger / DirectAdmin Node.js apps).
await writeFile(
  path.join(out, "app.js"),
  `// Entry point for panel-managed Node apps (Passenger, DirectAdmin, cPanel).
process.env.NODE_ENV = "production";
process.env.PORT = process.env.PORT || "3000";
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
require("./server.js");
`,
);

console.log("Deploy folder ready:", out);
console.log("Upload its contents, set the environment variables, then start server.js (or app.js).");
