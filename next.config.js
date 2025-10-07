/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("pg", "pg-hstore");
    }
    return config;
  },
};

export default nextConfig;
