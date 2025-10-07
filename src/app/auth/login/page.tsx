"use client";
import Link from "next/link";
import { Grid, Box, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../authForms/AuthLogin";
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default async function Login() {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
       await axios.get("/api/auth/me", { withCredentials: true });
       
          router.push("/dashboard");
      
      } catch (error) {
          router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);
  return (
    <PageContainer title="Login Dashboard" description="this is dashboard">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={"calc(100vh - 75px)"}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}
            >
              <Image
                src={"/images/backgrounds/login-bg.svg"}
                alt="bg"
                width={500}
                height={500}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  maxHeight: "500px",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <AuthLogin
              title="Welcome to Dashboard MCKY!"
              
                
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
