import * as React from "react";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import type { Navigation, Router } from "@toolpad/core";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const userType =
  typeof window !== "undefined" ? localStorage.getItem("type") : null;

// Define the navigation structure
export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main",
  },
  {
    segment: "home",
    title: "Home",
    icon: <DashboardIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <LayersIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  ...(userType === "applicant"
    ? [
        {
          segment: "applications",
          title: "Applications",
          icon: <BarChartIcon />,
        },
      ]
    : [
        {
          segment: "jobs",
          title: "Jobs",
          icon: <BarChartIcon />,
          children: [
            {
              segment: "create",
              title: "Create",
              icon: <DescriptionIcon />,
            },
            {
              segment: "mylists",
              title: "Lists",
              icon: <DescriptionIcon />,
            },
          ],
        },
      ]),
  {
    kind: "divider",
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

// Define the theme
const demoTheme = createTheme({
  palette: {
    mode: "light",
  },
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  // colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const router = React.useMemo<Router>(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(path),
    }),
    [location, navigate]
  );

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      router={router}
      branding={{ title: "JOB PORTAL" }}
    >
      <DashboardLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          {children}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default AuthenticatedLayout;
