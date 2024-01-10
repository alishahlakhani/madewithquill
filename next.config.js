/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,      // Enable SWC minification for improved performance
    reactStrictMode: process.env.NODE_ENV === "development" ? false : true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
    },
}

module.exports = nextConfig
