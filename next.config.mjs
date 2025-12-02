/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // 👈 tells Next to generate a static site
  trailingSlash: true,       // 👈 helps with GitHub Pages routing
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,       // 👈 required for static export
  },
};

export default nextConfig;
