import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Fungsi bantu untuk decode JWT tanpa verify (hanya untuk membaca expiry)
function decodeJWT(token: string) {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function authMiddleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  console.log("🧠 Middleware aktif! Path:", pathname);

  // Jalankan hanya di route yang butuh login
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Jika tidak ada accessToken → cek refresh token
  if (!accessToken) {
    console.log("⚠️ Tidak ada accessToken, coba refresh...");
    if (!refreshToken) {
      console.log("🚫 Tidak ada refreshToken juga → logout");
      const res = NextResponse.redirect(new URL("/login", origin));
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }

    // Coba refresh token
    try {
      const refreshRes = await fetch(`${origin}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) {
        console.log("🚫 Refresh token gagal → logout");
        const res = NextResponse.redirect(new URL("/login", origin));
        res.cookies.delete("accessToken");
        res.cookies.delete("refreshToken");
        return res;
      }

      const data = await refreshRes.json();
      const res = NextResponse.next();
      res.cookies.set("accessToken", data.accessToken, { httpOnly: true });
      console.log("✅ Access token diperbarui");
      return res;
    } catch (err) {
      console.log("❌ Error refresh token:", err);
      const res = NextResponse.redirect(new URL("/login", origin));
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  // Jika ada accessToken, cek apakah sudah kadaluarsa
  const decoded = decodeJWT(accessToken);
  const now = Math.floor(Date.now() / 1000);
  if (decoded?.exp && decoded.exp < now) {
    console.log("⚠️ Access token kadaluarsa, coba refresh...");

    if (!refreshToken) {
      console.log("🚫 Tidak ada refreshToken → logout");
      const res = NextResponse.redirect(new URL("/login", origin));
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }

    // Refresh token
    try {
      const refreshRes = await fetch(`${origin}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) {
        console.log("🚫 Refresh token gagal → logout");
        const res = NextResponse.redirect(new URL("/login", origin));
        res.cookies.delete("accessToken");
        res.cookies.delete("refreshToken");
        return res;
      }

      const data = await refreshRes.json();
      const res = NextResponse.next();
      res.cookies.set("accessToken", data.accessToken, { httpOnly: true });
      console.log("✅ Access token diperbarui dari refresh");
      return res;
    } catch (err) {
      console.log("❌ Error saat refresh:", err);
      const res = NextResponse.redirect(new URL("/login", origin));
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  // Jika token valid → lanjut
  console.log("✅ Access token valid, lanjut ke halaman");
  return NextResponse.next();
}
