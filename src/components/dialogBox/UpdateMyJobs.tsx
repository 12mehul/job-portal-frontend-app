import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { useFormik } from "formik";
import authFetch from "../../axiosbase/interceptors";
import { toast } from "react-toastify";
import { IJobLists } from "../../interface/IJob";

interface IUpdatePageProps {
  open: boolean;
  handleClose: Function;
  triggerRefresh: Function;
  data: IJobLists[];
  id: string | null;
}

const initialValues: IJobLists = {
  _id: "",
  activeApplications: 0,
  acceptedCandidates: 0,
  skillsets: [],
  rating: 0,
  userId: "",
  title: "",
  maxApplicants: 0,
  maxPositions: 0,
  dateOfPosting: "",
  deadline: "",
  jobType: "",
  duration: 0,
  salary: 0,
  recruiter: {
    _id: "",
    userId: "",
    name: "",
    contactNumber: "",
    bio: "",
  },
};

const UpdateMyJobs: React.FC<IUpdatePageProps> = (props) => {
  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (!props.id) return;

      authFetch
        .put(`/jobs/${props.id}`, values)
        .then((res) => {
          if (res.data) {
            toast.success(res.data.message);
            props.handleClose();
            props.triggerRefresh();
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err.response.data.message);
            props.handleClose();
          }
        });
    },
  });

  useEffect(() => {
    if (props.id) {
      const jobToEdit = props.data.find((job) => job._id === props.id);
      if (jobToEdit) {
        setValues(jobToEdit);
      }
    }
  }, [props.id, props.data, setValues]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.handleClose();
        }}
        fullWidth
        maxWidth="md"
        slotProps={{
          backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.3)" } },
        }}
      >
        <DialogTitle textAlign="center" sx={{ fontSize: "35px" }}>
          Update Details
        </DialogTitle>
        <DialogContent>
          <Grid2 size={12}>
            <TextField
              label="Application Deadline"
              margin="dense"
              variant="outlined"
              color="secondary"
              type="date"
              name="deadline"
              fullWidth
              value={values.deadline.split("T")[0]}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="Maximum Number Of Applicants"
              margin="dense"
              variant="outlined"
              color="secondary"
              type="number"
              name="maxApplicants"
              fullWidth
              value={values.maxApplicants}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="Positions Available"
              margin="dense"
              variant="outlined"
              color="secondary"
              type="number"
              name="maxPositions"
              fullWidth
              value={values.maxPositions}
              onChange={handleChange}
            />
          </Grid2>
        </DialogContent>
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
            onClick={() => {
              props.handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: pink[500],
              "&:hover": {
                backgroundColor: pink[400],
              },
            }}
            onClick={() => handleSubmit()}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateMyJobs;
