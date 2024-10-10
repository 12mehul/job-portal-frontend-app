import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  Dialog,
  DialogActions,
  Grid2,
  Rating,
  Typography,
} from "@mui/material";
import authFetch from "../axiosbase/interceptors";
import { AxiosResponse } from "axios";
import { IApplications, IJobStatus } from "../interface/IApplications";
import {
  blue,
  green,
  grey,
  lightBlue,
  orange,
  red,
} from "@mui/material/colors";
import { toast } from "react-toastify";

const colorSet: Record<IJobStatus, string> = {
  applied: blue[600],
  shortlisted: orange[600],
  accepted: green[600],
  rejected: red[600],
  finished: lightBlue[500],
};

const Applications = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState<IApplications[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const fetchData = () => {
    authFetch
      .get("/applications")
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = (jobId: string, currentRating: number | null) => {
    setSelectedJobId(jobId);
    setRating(currentRating);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    setRating(null);
  };

  const handleRatingUpdate = async () => {
    if (selectedJobId && rating !== null) {
      try {
        const res = await authFetch.put(`/rating`, {
          rating,
          jobId: selectedJobId,
        });
        if (res.data) {
          toast.success("Rating updated successfully");
          fetchData();
          handleClickClose();
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message);
      }
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
                    fontWeight: 500,
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
                  <Box component="span" sx={{ color: grey[600] }}>
                    {new Date(value.dateOfApplication).toLocaleDateString()}
                  </Box>
                </Box>
              </Grid2>
              {value.status === "accepted" || value.status === "finished" ? (
                <Grid2 margin={1}>
                  <Box>
                    Joined On:{" "}
                    <Box component="span" sx={{ color: grey[600] }}>
                      {new Date(value.dateOfJoining).toLocaleDateString()}
                    </Box>
                  </Box>
                </Grid2>
              ) : null}
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
            <CardActions
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Badge
                sx={{
                  backgroundColor: colorSet[value.status as IJobStatus],
                  textTransform: "uppercase",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  color: "white",
                  justifyContent: "center",
                }}
              >
                {value.status}
              </Badge>
              {value.status === "accepted" || value.status === "finished" ? (
                <Button
                  sx={{
                    backgroundColor: blue[700],
                    "&:hover": {
                      backgroundColor: blue[600],
                    },
                    textTransform: "uppercase",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    color: "white",
                    justifyContent: "center",
                  }}
                  onClick={() =>
                    handleClickOpen(value.job._id, value.job.rating)
                  }
                >
                  Rate Job
                </Button>
              ) : null}
              <Dialog
                open={open}
                onClose={() => handleClickClose()}
                fullWidth
                maxWidth="xs"
                slotProps={{
                  backdrop: {
                    style: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                  },
                }}
              >
                <Box textAlign="center" margin={2}>
                  <Rating
                    value={rating}
                    precision={0.5}
                    onChange={(_event, newValue) => setRating(newValue)}
                  />
                </Box>
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button
                    type="button"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: blue[500],
                      "&:hover": {
                        backgroundColor: blue[400],
                      },
                    }}
                    onClick={handleRatingUpdate}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </CardActions>
          </Card>
        ))}
      </Grid2>
    </Box>
  );
};

export default Applications;
