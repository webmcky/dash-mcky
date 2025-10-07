import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const refreshToken = req.headers.get("cookie")?.split("refreshToken=")[1]?.split(";")[0];
    if (!refreshToken) {
        return NextResponse.json({ error: "No refresh token provided" }, { status: 401 });
    }

    try {
        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

        const newAccesssToken = jwt.sign(
            { id: (decode as any).id, email: (decode as any).email, name: (decode as any).name },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
        )

        const res = NextResponse.json({ message: "token refreshed" });
        res.cookies.set("accessToken", newAccesssToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/",
            sameSite: "strict",
            maxAge: 60 * 5,
        }
        )
        return res;
    } catch (error) {
        const res = NextResponse.json({ error: 'Refresh token invalid' }, { status: 401 });
        res.cookies.delete('accessToken');
        res.cookies.delete('refreshToken');
        return res;
    }
}