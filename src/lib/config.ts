export const config = {
  host:
    process.env.NODE_ENV === "production"
      ? "https://baby-care-store-three.vercel.app"
      : "http://localhost:3000",
};
