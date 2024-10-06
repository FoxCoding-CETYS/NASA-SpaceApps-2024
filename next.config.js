/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        AZURE_MAPS_API_KEY: process.env.AZURE_MAPS_API_KEY,
    }
}

module.exports = nextConfig
