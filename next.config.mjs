/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export generates a self-contained `out/` directory on `npm run build`
  // so you can drag and drop the `out` folder directly into Netlify Drop!
  output: 'export',
  // Cache-bust client assets between manual Netlify Drop releases.
  deploymentId: 'contrast-2026-10-16',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
