"use client";
import { Button, Grid, Stack } from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import { useState } from "react";
import axios from "axios";
import MediaImageCard from "@/app/components/apps/banner/Image";
import MediaVideoCard from "@/app/components/apps/banner/Video";
import ViewImageCard from "@/app/components/apps/banner/ViewImageCard";
import Thumbnail from "@/app/components/apps/banner/Thumbnail";
import BlankCard from "@/app/components/shared/BlankCard";

const BCrumb = [
  { to: "/dashboard", title: "Home" },
  { title: "Banner" },
];

export default function Banner() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();

      if (selectedImage) formData.append("image", selectedImage);
      if (selectedVideo) formData.append("video", selectedVideo);

      const res = await axios.post("/api/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Banner berhasil disimpan ke database!");
    } catch (error) {
      console.error("Save banner error:", error);
      alert("❌ Gagal menyimpan banner!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer title="Edit Banner" description="This is Edit Banner page">
      <Breadcrumb title="Edit Banner" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item lg={8} md={12} xs={12}>
          <Stack spacing={3}>
            <BlankCard>
              <MediaImageCard
                disabled={!!selectedVideo}
                onFileSelected={(file, preview) => {
                  setSelectedImage(file);
                  setImagePreview(preview);
                  setSelectedVideo(null);
                  setVideoPreview(null);
                }}
              />
            </BlankCard>

            <BlankCard>
              <MediaVideoCard
                disabled={!!selectedImage}
                onFileSelected={(file, preview) => {
                  setSelectedVideo(file);
                  setVideoPreview(preview);
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
              />
            </BlankCard>

            <BlankCard>
              <ViewImageCard />
            </BlankCard>
          </Stack>
        </Grid>

        <Grid item lg={4} md={12} xs={12}>
          <Stack spacing={3}>
            <BlankCard>
              <Thumbnail />
            </BlankCard>
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={(!selectedImage && !selectedVideo) || saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setSelectedImage(null);
            setSelectedVideo(null);
            setImagePreview(null);
            setVideoPreview(null);
          }}
        >
          Cancel
        </Button>
      </Stack>
    </PageContainer>
  );
}
