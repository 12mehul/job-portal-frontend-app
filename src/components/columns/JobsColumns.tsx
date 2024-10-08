import { GridColDef } from "@mui/x-data-grid";
import { Box, Button, Card, Rating } from "@mui/material";
import { IJobLists } from "../../interface/IJob";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import ViewApplyDialog from "../dialogBox/ViewApplyDialog";

const JobsColumns = (): GridColDef<IJobLists>[] => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const userType =
    typeof window !== "undefined" ? localStorage.getItem("type") : null;

  const handleOpen = (id: string) => {
    setOpen(true);
    setSelectedJobId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJobId(null);
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
      field: "recruiter",
      headerName: "POSTED BY",
      width: 140,
      renderCell: (params) => (
        <Box component="span" sx={{ textTransform: "capitalize" }}>
          {params.row.recruiter.name}
        </Box>
      ),
    },
    {
      field: "deadline",
      headerName: "DEADLINE",
      width: 120,
      renderCell: (params) => (
        <Box component="span">
          {new Date(params.row.deadline).toLocaleDateString()}
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
            justifyContent: "center",
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
            disabled={userType === "recruiter"}
            onClick={() => handleOpen(params.row._id)}
          >
            Apply
          </Button>
          <ViewApplyDialog
            open={open}
            handleClose={handleClose}
            id={selectedJobId}
          />
        </Card>
      ),
    },
  ];
};

export default JobsColumns;
