/** @type {import('next').NextConfig} */
const nextConfig = {
     images : {
        domains : ["lh3.googleusercontent.com", "avatars.githubusercontent.com"]
     }, 
     allowedDevOrigins : [
      'http://192.168.1.35:3000'
     ]
};

export default nextConfig;
