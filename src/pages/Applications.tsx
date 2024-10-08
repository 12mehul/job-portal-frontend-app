import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Card,
  CardActions,
  Chip,
  Grid2,
  Typography,
} from "@mui/material";
import authFetch from "../axiosbase/interceptors";
import { AxiosResponse } from "axios";
import { IApplications } from "../interface/IApplications";
import { blue } from "@mui/material/colors";

const Applications = () => {
  const [data, setData] = useState<IApplications[]>([]);

  useEffect(() => {
    authFetch
      .get("/applications")
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Grid2 container spacing={3} justifyContent="center">
        <Typography
          variant="h4"
          component="h4"
          sx={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "45px",
            fontWeight: 500,
          }}
        >
          Applications
        </Typography>
      </Grid2>
      <Grid2 spacing={3} justifyContent="start" width="100%">
        {data.map((value) => (
          <Grid2 key={value._id}>
            <Card sx={{ borderRadius: "30px" }}>
              <Grid2 margin={1}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    fontSize: "25px",
                  }}
                >
                  {value.job.title}
                </Typography>
              </Grid2>
              <Grid2 margin={2}>
                <Box
                  component="span"
                  sx={{
                    color: "text.secondary",
                    textTransform: "capitalize",
                  }}
                >
                  Posted By: {value.recruiter.name}
                </Box>
              </Grid2>
              <Grid2 margin={2}>
                <Box
                  component="span"
                  sx={{
                    color: "text.secondary",
                    textTransform: "capitalize",
                  }}
                >
                  Role: {value.job.jobType}
                </Box>
              </Grid2>
              <Grid2 margin={2}>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  Salary: Rs {value.job.salary} per month
                </Box>
              </Grid2>
              <Grid2 margin={2}>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  Duration:{" "}
                  {value.job.duration !== 0
                    ? `${value.job.duration} month`
                    : "Flexible"}
                </Box>
              </Grid2>
              <Grid2 margin={2}>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  Applied On:{" "}
                  {new Date(value.dateOfApplication).toLocaleDateString()}
                </Box>
              </Grid2>
              <Grid2 margin={2}>
                {value?.job.skillsets.length > 0 && (
                  <div>
                    {value.job.skillsets.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        sx={{ margin: "3px", padding: "10px" }}
                      />
                    ))}
                  </div>
                )}
              </Grid2>
              <CardActions>
                <Badge
                  sx={{
                    backgroundColor: blue[700],
                    "&:hover": {
                      backgroundColor: blue[600],
                    },
                    textTransform: "uppercase",
                    padding: "10px 5px",
                    borderRadius: "30px",
                    color: "white",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {value.status}
                </Badge>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Applications;
