"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Typography, useTheme, Chip } from "@mui/material";
import { useDropzone } from "react-dropzone";

const Thumbnail = () => {
  const theme = useTheme();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: File, i) => (
    <Box
      key={i}
      display="flex"
      alignItems="center"
      py={1}
      mt={2}
      sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
      justifyContent="space-between"
    >
      <Typography variant="body1" fontWeight="500">
        {file.name}{" "}
      </Typography>
      <Chip color="primary" label={`${file.size} Bytes`} />
    </Box>
  ));

  return (
    <Box p={3}>
      <Typography variant="h5">Remember</Typography>

      <Box
        mt={3}
        fontSize="12px"
        sx={{
            
          padding: "30px",
          textAlign: "center",
          border: `1px dashed`,
        
        }}
        {...getRootProps({ className: "dropzone" })}
      >
         <p>You can upload your banner by draging and dropping an image or video into the form on the left, or by clicking to select a file</p>
          <Typography variant="body2" textAlign="center" mt={1}>
        Set the banner image. Only *.png, *.jpg and *.jpeg image
        files are accepted, thank you.
      </Typography>
      </Box>
     
      
    </Box>
  );
};

export default Thumbnail;
