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
import { IApplications, IJobStatus } from "../../interface/IApplications";
import {
  blue,
  green,
  grey,
  lightBlue,
  orange,
  red,
} from "@mui/material/colors";
import { useParams } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { toast } from "react-toastify";

const colorSet: Record<IJobStatus, string> = {
  applied: blue[600],
  shortlisted: orange[600],
  accepted: green[600],
  rejected: red[600],
  finished: lightBlue[500],
};

const JobApplications = () => {
  const { jobId } = useParams();
  const [data, setData] = useState<IApplications[]>([]);

  const fetchData = () => {
    authFetch
      .get(`/applicants?jobId=${jobId}&desc=dateOfApplication`)
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!jobId) return;
    fetchData();
  }, [jobId]);

  const handleUpdateStatus = async (status: string, id: string) => {
    try {
      const statusData = {
        status: status,
        dateOfJoining: new Date().toISOString(),
      };
      const res = await authFetch.put(`/applications/${id}`, statusData);
      if (res.data) {
        toast.success(res.data.message);
        fetchData();
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Box>
      <Grid2 container spacing={3} justifyContent="center">
        <Typography
          variant="h4"
          component="h4"
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "45px",
            fontWeight: 500,
            borderBottom: "2px solid",
            borderBottomColor: grey[500],
            width: "100%",
            borderRadius: "3px",
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
            <CardActions
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {value.status === "applied" ? (
                <>
                  <Button
                    sx={{
                      backgroundColor: colorSet["shortlisted"],
                      textTransform: "uppercase",
                      padding: "10px 15px",
                      borderRadius: "10px",
                      color: "white",
                      justifyContent: "center",
                    }}
                    onClick={() => handleUpdateStatus("shortlisted", value._id)}
                  >
                    Shortlist
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: colorSet["rejected"],
                      textTransform: "uppercase",
                      padding: "10px 15px",
                      borderRadius: "10px",
                      color: "white",
                      justifyContent: "center",
                    }}
                    onClick={() => handleUpdateStatus("rejected", value._id)}
                  >
                    Reject
                  </Button>
                </>
              ) : value.status === "shortlisted" ? (
                <>
                  <Button
                    sx={{
                      backgroundColor: colorSet["accepted"],
                      textTransform: "uppercase",
                      padding: "10px 15px",
                      borderRadius: "10px",
                      color: "white",
                      justifyContent: "center",
                    }}
                    onClick={() => handleUpdateStatus("accepted", value._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: colorSet["rejected"],
                      textTransform: "uppercase",
                      padding: "10px 15px",
                      borderRadius: "10px",
                      color: "white",
                      justifyContent: "center",
                    }}
                    onClick={() => handleUpdateStatus("rejected", value._id)}
                  >
                    Reject
                  </Button>
                </>
              ) : value.status === "rejected" ? (
                <Box
                  sx={{
                    backgroundColor: colorSet["rejected"],
                    textTransform: "uppercase",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    color: "white",
                    justifyContent: "center",
                  }}
                >
                  Rejected
                </Box>
              ) : value.status === "accepted" ? (
                <Box
                  sx={{
                    backgroundColor: colorSet["accepted"],
                    textTransform: "uppercase",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    color: "white",
                    justifyContent: "center",
                  }}
                >
                  Accepted
                </Box>
              ) : value.status === "finished" ? (
                <Box
                  sx={{
                    backgroundColor: colorSet["finished"],
                    textTransform: "uppercase",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    color: "white",
                    justifyContent: "center",
                  }}
                >
                  Finished
                </Box>
              ) : null}
            </CardActions>
          </Card>
        ))}
      </Grid2>
    </Box>
  );
};

export default JobApplications;
