/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		GRAPHHOPPER_BASE_URL: process.env.GRAPHHOPPER_BASE_URL,
		GRAPHHOPPER_API_KEY: process.env.GRAPHHOPPER_API_KEY,
	},
};

export default nextConfig;
