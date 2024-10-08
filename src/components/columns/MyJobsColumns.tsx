import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Button, Card, Rating } from "@mui/material";
import { IJobLists } from "../../interface/IJob";
import { blue, pink, teal } from "@mui/material/colors";
import DeleteMyJobs from "../dialogBox/DeleteMyJobs";
import UpdateMyJobs from "../dialogBox/UpdateMyJobs";
import { useNavigate } from "react-router-dom";

const MyJobsColumns = (
  triggerRefresh: Function,
  data: IJobLists[]
): GridColDef<IJobLists>[] => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [delOpen, setDelOpen] = useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setOpen(true);
    setSelectedJobId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedJobId(null);
  };

  const handleDelOpen = (id: string) => {
    setDelOpen(true);
    setSelectedJobId(id);
  };
  const handleDelClose = () => {
    setDelOpen(false);
    setSelectedJobId(null);
  };

  const handleView = (id: string) => {
    navigate(`/job/applications/${id}`);
  };

  return [
    {
      field: "title",
      headerName: "TITLE",
      width: 120,
      renderCell: (params) => (
        <Box component="span" sx={{ textTransform: "capitalize" }}>
          {params.row.title}
        </Box>
      ),
    },
    { field: "jobType", headerName: "ROLE", width: 140 },
    {
      field: "salary",
      headerName: "SALARY",
      width: 150,
      renderCell: (params) => (
        <Box component="span">Rs {params.row.salary} per month</Box>
      ),
    },
    {
      field: "duration",
      headerName: "DURATION",
      width: 100,
      renderCell: (params) => (
        <Box component="span">
          {params.row.duration !== 0
            ? `${params.row.duration} month`
            : "Flexible"}
        </Box>
      ),
    },
    {
      field: "dateOfPosting",
      headerName: "POSTING",
      width: 120,
      renderCell: (params) => (
        <Box component="span">
          {new Date(params.row.dateOfPosting).toLocaleDateString()}
        </Box>
      ),
    },
    {
      field: "maxApplicants",
      headerName: "APPLICANTS",
      width: 120,
    },
    {
      field: "maxPositions",
      headerName: "POSITIONS",
      width: 120,
      renderCell: (params) => (
        <Box component="span">
          {params.row.maxPositions - params.row.acceptedCandidates}
        </Box>
      ),
    },
    {
      field: "rating",
      headerName: "RATING",
      width: 130,
      renderCell: (params) => (
        <Box>
          <Rating value={params.row.rating || 0} precision={0.5} readOnly />
        </Box>
      ),
    },
    {
      field: "",
      headerName: "ACTION",
      width: 280,
      renderCell: (params: any) => (
        <Card
          sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "start",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: blue[500],
              "&:hover": {
                backgroundColor: blue[400],
              },
            }}
            onClick={() => handleView(params.row._id)}
          >
            View
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: teal[500],
              "&:hover": {
                backgroundColor: teal[400],
              },
            }}
            onClick={() => handleOpen(params.row._id)}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: pink[500],
              "&:hover": {
                backgroundColor: pink[400],
              },
            }}
            onClick={() => handleDelOpen(params.row._id)}
          >
            DELETE
          </Button>
          <UpdateMyJobs
            open={open}
            handleClose={handleClose}
            triggerRefresh={triggerRefresh}
            data={data}
            id={selectedJobId}
          />
          <DeleteMyJobs
            delOpen={delOpen}
            handleDelClose={handleDelClose}
            triggerRefresh={triggerRefresh}
            id={selectedJobId}
          />
        </Card>
      ),
    },
  ];
};

export default MyJobsColumns;
