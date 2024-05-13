/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [{ source: "/", destination: "/search", permanent: true }],
  transpilePackages: ["core"],
};

export default nextConfig;
