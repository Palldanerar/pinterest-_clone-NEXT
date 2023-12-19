/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['avatars.githubusercontent.com', 'firebasestorage.googleapis.com']
    },
    reactStrictMode: false,
}

module.exports = nextConfig