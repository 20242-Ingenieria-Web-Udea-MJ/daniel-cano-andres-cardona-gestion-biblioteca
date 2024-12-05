/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'proassetspdlcom.cdnstatics2.com',
      's.gravatar.com',
      'upload.wikimedia.org',
      'www.planetadelibros.com',
      'images.cdn3.buscalibre.com',
      'res.cloudinary.com',
    ],
  },
};

export default nextConfig;
