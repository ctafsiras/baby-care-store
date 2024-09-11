import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function signJWT(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyJWT(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}
