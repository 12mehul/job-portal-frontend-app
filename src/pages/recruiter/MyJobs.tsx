import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import authFetch from "../../axiosbase/interceptors";
import { AxiosResponse } from "axios";
import { IJobLists } from "../../interface/IJob";
import MyJobsColumns from "../../components/columns/MyJobsColumns";

const MyJobs = () => {
  const [data, setData] = useState<IJobLists[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

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
    <div>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          textAlign: "center",
          marginBottom: "2px",
          fontSize: "45px",
          fontWeight: 500,
        }}
      >
        My Jobs
      </Typography>
      <div style={{ height: 320, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={MyJobsColumns(triggerRefresh, data)}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default MyJobs;
