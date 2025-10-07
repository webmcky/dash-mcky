// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const accessToken = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("accessToken="))
    ?.split("=")[1];

  if (!accessToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    // Verifikasi JWT (gunakan secret yang sama dengan backend login)
    jwt.verify(accessToken, process.env.JWT_SECRET!);
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
