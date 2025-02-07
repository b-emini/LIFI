/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '/**',
            },
            // {
            //     protocol: 'https',
            //     hostname: 'static.debank.com',
            //     port: '',
            //     pathname: '/**',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'assets.coingecko.com',
            //     port: '',
            //     pathname: '/**',
            // },
        ],


    },
};

module.exports = nextConfig;