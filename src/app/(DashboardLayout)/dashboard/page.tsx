"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import YearlyBreakup from "@/app/components/dashboards/modern/YearlyBreakup";
import MonthlyEarnings from "@/app/components/dashboards/modern/MonthlyEarnings";
import TopCards from "@/app/components/dashboards/modern/TopCards";
import RevenueUpdates from "@/app/components/dashboards/modern/RevenueUpdates";
import EmployeeSalary from "@/app/components/dashboards/modern/EmployeeSalary";
import Customers from "@/app/components/dashboards/modern/Customers";
import Projects from "@/app/components/dashboards/modern/Projects";
import Social from "@/app/components/dashboards/modern/Social";
import SellingProducts from "@/app/components/dashboards/modern/SellingProducts";
import WeeklyStats from "@/app/components/dashboards/modern/WeeklyStats";
import TopPerformers from "@/app/components/dashboards/modern/TopPerformers";
import Welcome from "@/app/(DashboardLayout)/layout/shared/welcome/Welcome";
import axios from "axios";
export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios("/api/auth/me");

        if (res) {
          setAuthorized(true);
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

 

  if (!authorized) {
    return null;
  }

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>

          <Grid item xs={12} lg={8}>
            <RevenueUpdates isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <YearlyBreakup isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <MonthlyEarnings isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <EmployeeSalary isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Customers isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects isLoading={isLoading} />
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <SellingProducts />
          </Grid>

          <Grid item xs={12} lg={4}>
            <WeeklyStats isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <TopPerformers />
          </Grid>
        </Grid>
        <Welcome />
      </Box>
    </PageContainer>
  );
}
