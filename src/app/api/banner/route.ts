import { NextRequest, NextResponse } from "next/server";
import formidable, { File as FormidableFile, Files } from "formidable";
import fs from "fs";
import path from "path";
import Banner from "@/models/Banner"; 
import { Readable } from "stream";

export const dynamic = "force-dynamic";


const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "banner");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}


function generateFilename(originalName: string): string {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext).replace(/\s+/g, "-");
  const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `${base}-${unique}${ext}`;
}


function toNodeRequest(req: NextRequest): any {
  const readable = Readable.fromWeb(req.body as any);
  return Object.assign(readable, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
  });
}

async function parseForm(req: NextRequest): Promise<{ files: FormidableFile[] }> {
  const form = formidable({
    multiples: false, 
    keepExtensions: true,
    maxFileSize: 200 * 1024 * 1024, 
    uploadDir: UPLOAD_DIR,
  });

  const nodeReq = toNodeRequest(req);

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, _fields, files: Files) => {
      if (err) return reject(err);

      const fileList: FormidableFile[] = [];
      for (const value of Object.values(files)) {
        if (!value) continue;
        if (Array.isArray(value)) {
          value.forEach((v) => v && fileList.push(v));
        } else {
          fileList.push(value);
        }
      }
      resolve({ files: fileList });
    });
  });
}


export async function POST(req: NextRequest) {
  try {
    const { files } = await parseForm(req);
    if (!files?.length) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const file = files[0];
    const mime = file.mimetype || "";

    if (!/^image\/|^video\//.test(mime)) {
      fs.unlinkSync(file.filepath);
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const oldBanners = await Banner.findAll();
    for (const old of oldBanners) {
      const filePath = old.imageUrl || old.videoUrl;
      if (filePath) {
        const fullPath = path.join(process.cwd(), "public", filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
      await old.destroy();
    }

    const newName = generateFilename(file.originalFilename || "file");
    const destPath = path.join(UPLOAD_DIR, newName);
    await fs.promises.rename(file.filepath, destPath);

    const url = `/uploads/banner/${newName}`;
    const banner = await Banner.create({
      imageUrl: mime.startsWith("image/") ? url : null,
      videoUrl: mime.startsWith("video/") ? url : null,
    });

    return NextResponse.json({
      ok: true,
      message: "✅ Banner updated successfully",
      data: banner,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const banner = await Banner.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (!banner) {
      return NextResponse.json({ ok: false, message: "No banner found" });
    }

    const hasImage = !!banner.imageUrl;
    const hasVideo = !!banner.videoUrl;

    return NextResponse.json({
      ok: true,
      data: banner,
      info: {
        hasImage,
        hasVideo,
        type: hasVideo ? "video" : hasImage ? "image" : "none",
      },
    });
  } catch (err: any) {
    console.error("Fetch banners error:", err);
    return NextResponse.json(
      { error: "Failed to fetch banners", details: err.message },
      { status: 500 }
    );
  }
}



export const config = {
  api: {
    bodyParser: false,
  },
};
