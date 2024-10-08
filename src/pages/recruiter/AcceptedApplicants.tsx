import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  Grid2,
  Typography,
} from "@mui/material";
import authFetch from "../../axiosbase/interceptors";
import { AxiosResponse } from "axios";
import { IApplications } from "../../interface/IApplications";
import { blue, orange, pink } from "@mui/material/colors";
import { useParams } from "react-router-dom";

const AcceptedApplicants = () => {
  const { jobId } = useParams();
  const [data, setData] = useState<IApplications[]>([]);

  useEffect(() => {
    if (!jobId) return;
    authFetch
      .get(`/applicants?jobId=${jobId}&desc=dateOfApplication`)
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jobId]);

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
              <Grid2 margin={2}>
                <Box
                  component="span"
                  sx={{
                    color: "text.secondary",
                    textTransform: "capitalize",
                  }}
                >
                  {value.jobApplicant.name}
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
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  sx={{
                    backgroundColor: blue[700],
                    "&:hover": {
                      backgroundColor: blue[600],
                    },
                    textTransform: "uppercase",
                    padding: "10px 15px",
                    borderRadius: "30px",
                    color: "white",
                    justifyContent: "center",
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  sx={{
                    backgroundColor: orange[600],
                    "&:hover": {
                      backgroundColor: orange[500],
                    },
                    textTransform: "uppercase",
                    padding: "10px 15px",
                    borderRadius: "30px",
                    color: "white",
                    justifyContent: "center",
                  }}
                >
                  Shortlist
                </Button>
                <Button
                  sx={{
                    backgroundColor: pink[500],
                    "&:hover": {
                      backgroundColor: pink[400],
                    },
                    textTransform: "uppercase",
                    padding: "10px 15px",
                    borderRadius: "30px",
                    color: "white",
                    justifyContent: "center",
                  }}
                >
                  Reject
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default AcceptedApplicants;
