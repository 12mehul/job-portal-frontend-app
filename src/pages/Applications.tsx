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
import { blue, grey } from "@mui/material/colors";

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
    <Box>
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
      <Grid2 spacing={3} width="100%">
        {data.map((value) => (
          <Card sx={{ borderRadius: "30px" }} key={value._id}>
            <Grid2 sx={{ paddingX: "25px" }}>
              <Grid2 margin={1}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    fontSize: "35px",
                    color: grey[700],
                    fontWeight: 600,
                  }}
                >
                  {value.job.title}
                </Typography>
              </Grid2>
              <Grid2 margin={1}>
                <Box>
                  Posted By:{" "}
                  <Box
                    component="span"
                    sx={{
                      color: grey[600],
                      textTransform: "capitalize",
                    }}
                  >
                    {value.recruiter.name}
                  </Box>
                </Box>
              </Grid2>
              <Grid2 margin={1}>
                <Box>
                  Role:{" "}
                  <Box
                    component="span"
                    sx={{
                      color: grey[600],
                      textTransform: "capitalize",
                    }}
                  >
                    {value.job.jobType}
                  </Box>
                </Box>
              </Grid2>
              <Grid2 margin={1}>
                <Box>
                  Salary:{" "}
                  <Box
                    component="span"
                    sx={{
                      color: grey[600],
                      textTransform: "capitalize",
                    }}
                  >
                    Rs {value.job.salary} per month
                  </Box>
                </Box>
              </Grid2>
              <Grid2 margin={1}>
                <Box>
                  Duration:{" "}
                  <Box
                    component="span"
                    sx={{
                      color: grey[600],
                      textTransform: "capitalize",
                    }}
                  >
                    {value.job.duration !== 0
                      ? `${value.job.duration} month`
                      : "Flexible"}
                  </Box>
                </Box>
              </Grid2>
              <Grid2 margin={1}>
                <Box>
                  Applied On:{" "}
                  <Box
                    component="span"
                    sx={{
                      color: grey[600],
                      textTransform: "capitalize",
                    }}
                  >
                    {new Date(value.dateOfApplication).toLocaleDateString()}
                  </Box>
                </Box>
              </Grid2>
              <Grid2 margin={1}>
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
        ))}
      </Grid2>
    </Box>
  );
};

export default Applications;
