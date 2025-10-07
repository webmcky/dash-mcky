"use client";
import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import { Chip, Typography, useTheme, CircularProgress } from "@mui/material";
import { useDropzone } from "react-dropzone";
import  {mediaProps} from "@/app/(DashboardLayout)/types/apps/banner";


export default function MediaImageCard({ disabled = false, onFileSelected }: mediaProps) {
  const theme = useTheme();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || !acceptedFiles.length) return;
      const file = acceptedFiles[0];

      // buat preview lokal, belum upload ke server
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFileName(file.name);
      onFileSelected?.(file, previewUrl);
    },
    [disabled, onFileSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
  });

  return (
    <Box p={3} sx={{ opacity: disabled ? 0.5 : 1 }}>
      <Typography variant="h5">Upload Image Banner</Typography>

      <Box
        mt={3}
        sx={{
          backgroundColor: "primary.light",
          color: "primary.main",
          padding: "40px 30px",
          textAlign: "center",
          border: "1px dashed",
          borderColor: "primary.main",
          pointerEvents: disabled ? "none" : "auto",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <CircularProgress color="primary" />
        ) : (
          <Typography variant="body2">
            {disabled
              ? "Video upload detected. Image upload disabled."
              : "Drag & drop image or click to select"}
          </Typography>
        )}
      </Box>

      {preview && (
        <Box mt={2}>
          <Typography variant="h6" fontSize="15px">
            Review Upload:
          </Typography>
          <Box mt={1}>
            <img
              src={preview}
              alt="Uploaded Preview"
              style={{
                width: "100%",
                borderRadius: 8,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Chip label={fileName} color="primary" sx={{ mt: 1 }} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
