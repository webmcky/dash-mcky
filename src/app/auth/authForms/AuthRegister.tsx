'use client'
import { Box, Typography, Button, Divider } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
 import axios from "axios";
import { useRouter } from "next/navigation";

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const hanleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
       await axios.post('http://localhost:3000/api/auth/register', {
      name,
      email,
      password
    })
     router.push("/auth/login");
    } catch(error){
      console.error('There was an error!', error);
    } finally {
      setLoading(false);
    }
  }
  return (
      <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}
 
    <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          or sign up with
        </Typography>
      </Divider>
    </Box>

    <form onSubmit={hanleSubmit}>
    <Box>
      <Stack mb={3}>
        <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
        <CustomTextField id="name" name="name" variant="outlined" onChange={(e: any) => setName(e.target.value)} fullWidth />
        <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
        <CustomTextField id="email" name="email" variant="outlined" onChange={(e: any) => setEmail(e.target.value)} fullWidth />
        <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
        <CustomTextField id="password" name="password" variant="outlined" onChange={(e: any) => setPassword(e.target.value)} fullWidth />
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
      >
        Sign Up
      </Button>
    </Box>
    </form>
    {subtitle}
  </>
  )
}

export default AuthRegister;
