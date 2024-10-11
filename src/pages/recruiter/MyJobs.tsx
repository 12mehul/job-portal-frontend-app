import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Container,
  Grid2,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import authFetch from "../../axiosbase/interceptors";
import { AxiosResponse } from "axios";
import { IJobLists } from "../../interface/IJob";
import MyJobsColumns from "../../components/columns/MyJobsColumns";
import FilterDrawerContent from "../../components/FilterDrawerContent";
import FilterListIcon from "@mui/icons-material/FilterList";
import { grey } from "@mui/material/colors";

const MyJobs = () => {
  const [data, setData] = useState<IJobLists[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const fetchData = () => {
    authFetch
      .get("/jobs?myjobs=1")
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Function to trigger data refresh
  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Container maxWidth="lg">
      <Grid2
        margin={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: "45px",
            fontWeight: 500,
          }}
        >
          My Jobs
        </Typography>
        <Button
          onClick={toggleDrawer(true)}
          title="Filter Jobs"
          sx={{
            backgroundColor: grey[100],
            "&:hover": {
              backgroundColor: grey[200],
            },
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <FilterListIcon fontSize="medium" />
        </Button>
        <SwipeableDrawer
          anchor="top"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          PaperProps={{
            sx: { margin: "70px", alignItems: "center", borderRadius: "10px" },
          }}
        >
          <FilterDrawerContent toggleDrawer={toggleDrawer} />
        </SwipeableDrawer>
      </Grid2>
      <Grid2 sx={{ height: 320, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={MyJobsColumns(triggerRefresh, data)}
          getRowId={(row) => row._id}
        />
      </Grid2>
    </Container>
  );
};

export default MyJobs;
