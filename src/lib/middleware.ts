import { NextResponse } from "next/server";
import { verifyJWT } from "./jwt";

export function withAuth(handler: Function) {
  return async (
    request: Request & { user?: { userId: string; role: string } },
    ...args: any[]
  ) => {
    try {
      const token = request.headers.get("Authorization")?.split(" ")[1];
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const decoded = verifyJWT(token);
      request.user = decoded;

      return handler(request, ...args);
    } catch (error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}
