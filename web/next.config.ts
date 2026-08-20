import type { NextConfig } from "next";

// Vercel builds and traces the app itself; asking for a standalone bundle there
// breaks its build. Everywhere else (HostAfrica, a VPS, any Node host) the
// standalone output is what `npm run package` ships.
const selfHosted = !process.env.VERCEL;

const nextConfig: NextConfig = {
  ...(selfHosted ? { output: "standalone" as const } : {}),
  // Images are already sized for their slots, so no server-side image
  // pipeline (and no sharp install) is needed on the host.
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
