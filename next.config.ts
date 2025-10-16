module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  env: {
    API_URL: process.env.API_URL, // Example of using environment variables
  },
  webpack: (config) => {
    // Custom webpack configuration can go here
    return config;
  },
};