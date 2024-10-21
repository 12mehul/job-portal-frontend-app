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
  const [filters, setFilters] = useState<any>({});

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

  const fetchJobs = (filterParams: any = {}) => {
    let queryString = `http://localhost:4444/api/jobs?myjobs=1&`;

    // Add jobType filters to the query string
    if (filterParams.fullTime) {
      queryString += `jobType=Full%20Time&`;
    }
    if (filterParams.partTime) {
      queryString += `jobType=Part%20Time&`;
    }
    if (filterParams.wfh) {
      queryString += `jobType=Work%20from%20Home&`;
    }

    // Add salary range to the query string
    if (filterParams.salaryMin !== undefined && filterParams.salaryMin !== 0) {
      queryString += `salaryMin=${filterParams.salaryMin}&`;
    }
    if (
      filterParams.salaryMax !== undefined &&
      filterParams.salaryMax !== 100000
    ) {
      queryString += `salaryMax=${filterParams.salaryMax}&`;
    }

    // Add duration to the query string
    if (filterParams.duration && filterParams.duration !== "0") {
      queryString += `duration=${filterParams.duration}&`;
    }

    // Add sort order (asc/desc)
    if (filterParams.asc) {
      Object.keys(filterParams.asc).forEach((key) => {
        if (filterParams.asc[key]) {
          queryString += `asc=${key}&`;
        }
      });
    }
    if (filterParams.desc) {
      Object.keys(filterParams.desc).forEach((key) => {
        if (filterParams.desc[key]) {
          queryString += `desc=${key}&`;
        }
      });
    }

    // Trim the trailing "&" or "?" from the query string if necessary
    queryString = queryString.endsWith("&")
      ? queryString.slice(0, -1)
      : queryString;

    // Make API call
    authFetch
      .get(queryString)
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchJobs(filters);
  }, [refresh, filters]);

  // Function to trigger data refresh
  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // Handler to apply filters from the drawer
  const handleApplyFilters = (filterData: any) => {
    setFilters(filterData);
    setDrawerOpen(false); // Close the drawer after applying filters
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
          <FilterDrawerContent
            toggleDrawer={toggleDrawer}
            onApplyFilters={handleApplyFilters}
          />
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
