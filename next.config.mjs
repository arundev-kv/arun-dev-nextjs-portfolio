/** @type {import('next').NextConfig} */
const nextConfig = {
  // The homepage stays static. The résumé route runs on Netlify's Next.js runtime.
  deploymentId: 'contrast-2026-10-16',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingIncludes: {
    '/api/resume': ['./content/resume/**/*'],
    '/api/resume/': ['./content/resume/**/*'],
  },
  outputFileTracingExcludes: {
    '/api/resume': ['./.data/**/*'],
    '/api/resume/': ['./.data/**/*'],
  },
};

export default nextConfig;
