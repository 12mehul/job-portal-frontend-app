import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import authFetch from "../axiosbase/interceptors";
import { AxiosResponse } from "axios";
import { IJobLists } from "../interface/IJob";
import JobsColumns from "../components/columns/JobsColumns";

const Home = () => {
  const [data, setData] = useState<IJobLists[]>([]);

  useEffect(() => {
    authFetch
      .get("/jobs")
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        Jobs
      </Typography>
      <div style={{ height: 320, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={JobsColumns()}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Home;
