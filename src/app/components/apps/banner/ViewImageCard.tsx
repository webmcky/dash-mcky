"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography, Stack, useTheme } from "@mui/material";
import { Grid } from "@mui/material";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";

interface BannerData {
  imageUrl: string | null;
  videoUrl: string | null;
}

const ViewImageCard = () => {
  const theme = useTheme();
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const { data } = await axios.get("/api/banner"); // pakai axios
        if (data.ok) {
          setBanner(data.data);
        } else {
          setError("No banner available");
        }
      } catch (err: any) {
        console.error("Failed to fetch banner:", err);
        setError(err.message || "Error fetching banner");
      } finally {
        setLoading(false);
      }
    }

    fetchBanner();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;
  if (!banner) return <Typography>No banner available</Typography>;

  const hasImage = !!banner.imageUrl;
  const hasVideo = !!banner.videoUrl;

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        View Image or Video Banner
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Banner Preview
          </CustomFormLabel>

          <Stack
            direction="row"
            spacing={3}
            width="100%"
            useFlexGap
            flexWrap="wrap"
          >
            <Box
              px={2}
              py={1}
              flexGrow={1}
              sx={{
                border: `1px dashed ${theme.palette.divider}`,
                textAlign: "center",
              }}
            >
              {hasImage ? (
                <img
                  src={banner.imageUrl!}
                  alt="Banner Image"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              ) : hasVideo ? (
                <video
                  src={banner.videoUrl!}
                  controls
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              ) : (
                <Typography>No image or video available</Typography>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewImageCard;
