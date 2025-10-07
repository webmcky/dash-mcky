import { NextResponse } from "next/server";

export async function POST() {
const res = NextResponse.json({message : "logout success"});
res.cookies.delete('accessToken');
res.cookies.delete('refreshToken');
return res;
}