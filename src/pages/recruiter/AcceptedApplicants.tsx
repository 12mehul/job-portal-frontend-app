import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  Grid2,
  Rating,
  Typography,
} from "@mui/material";
import authFetch from "../../axiosbase/interceptors";
import { AxiosResponse } from "axios";
import { IApplications } from "../../interface/IApplications";
import { grey, orange, pink } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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
      <Grid2 spacing={3} justifyContent="start" width="100%">
        {data.map((value) => (
          <Card sx={{ borderRadius: "30px" }} key={value._id}>
            <Grid2
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingX: "25px",
                paddingTop: "10px",
              }}
            >
              <Box>
                <Grid2 margin={1}>
                  <Box
                    component="span"
                    sx={{
                      color: grey[700],
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}
                  >
                    {value.jobApplicant.name}
                  </Box>
                </Grid2>
                <Grid2 margin={1}>
                  <Rating
                    value={value.job.rating || 0}
                    precision={0.5}
                    readOnly
                  />
                </Grid2>
                <Grid2 margin={1}>
                  <Box>
                    Education:{" "}
                    {value.jobApplicant?.education?.map((item) => (
                      <Chip
                        key={item._id}
                        label={`${item.institutionName} (${item.startYear}-${item.endYear})`}
                        sx={{
                          fontSize: "15px",
                          textTransform: "capitalize",
                          color: grey[600],
                        }}
                      />
                    ))}
                  </Box>
                </Grid2>
                <Grid2 margin={1}>
                  <Box>
                    SOP:{" "}
                    <Box
                      component="span"
                      sx={{
                        color: grey[600],
                        textTransform: "capitalize",
                      }}
                    >
                      {value.sop}
                    </Box>
                  </Box>
                </Grid2>
                <Grid2 margin={1}>
                  <Box>
                    Applied On:{" "}
                    <Box component="span" sx={{ color: grey[600] }}>
                      {new Date(value.dateOfApplication).toLocaleDateString()}
                    </Box>
                  </Box>
                </Grid2>
              </Box>
              <Grid2 margin={2}>
                <Button
                  title="Download Resume"
                  sx={{
                    backgroundColor: grey[500],
                    "&:hover": {
                      backgroundColor: grey[400],
                    },
                    padding: "10px 15px",
                    borderRadius: "10px",
                    color: "white",
                    justifyContent: "center",
                  }}
                >
                  <FileDownloadIcon />
                </Button>
              </Grid2>
            </Grid2>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                sx={{
                  backgroundColor: orange[600],
                  "&:hover": {
                    backgroundColor: orange[500],
                  },
                  textTransform: "uppercase",
                  padding: "10px 15px",
                  borderRadius: "10px",
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
                  borderRadius: "10px",
                  color: "white",
                  justifyContent: "center",
                }}
              >
                Reject
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid2>
    </Box>
  );
};

export default AcceptedApplicants;
