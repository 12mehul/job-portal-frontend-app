import * as React from "react";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import type { Navigation, Router } from "@toolpad/core";
import { useLocation, useNavigate } from "react-router-dom";

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
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
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
        segment: "lists",
        title: "Lists",
        icon: <DescriptionIcon />,
      },
    ],
  },
];

// Define the theme
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
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
    [location.pathname, location.search, navigate]
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
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default AuthenticatedLayout;
