import { GridColDef } from "@mui/x-data-grid";
import { Box, Button, Card, Rating } from "@mui/material";
import { IJobLists } from "../interface/IJob";
import { blue } from "@mui/material/colors";
import { useState } from "react";

const JobsColumns = (): GridColDef<IJobLists>[] => {
  const [open, setOpen] = useState<boolean>(false);
  const userType =
    typeof window !== "undefined" ? localStorage.getItem("type") : null;

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
            // onClick={() => handleEdit(params.row.id)}
          >
            Apply
          </Button>
        </Card>
      ),
    },
  ];
};

export default JobsColumns;
