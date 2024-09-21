export const config = {
  host:
    process.env.NODE_ENV === "production"
      ? "https://baby-care-store-three.vercel.app"
      : "http://localhost:3000",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",

  },
};
