import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useFormik } from "formik";
import authFetch from "../../axiosbase/interceptors";
import { toast } from "react-toastify";

interface IDialogPageProps {
  open: boolean;
  handleClose: Function;
  id: string | null;
}
interface IFormValues {
  sop: string;
}
const initialValues: IFormValues = {
  sop: "",
};

const ViewApplyDialog: React.FC<IDialogPageProps> = (props) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values, action) => {
      if (!props.id) return;

      authFetch
        .post(`/jobs/${props.id}/applications`, values)
        .then((res) => {
          if (res.data) {
            toast.success(res.data.message);
            action.resetForm();
            props.handleClose();
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err.response.data.message);
            action.resetForm();
            props.handleClose();
          }
        });
    },
  });

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
        <DialogTitle textAlign="center">Apply for Job</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            label="Write SOP (upto 250 words)"
            variant="outlined"
            name="sop"
            type="text"
            fullWidth
            multiline
            rows={8}
            value={values.sop}
            onChange={handleChange}
          />
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
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewApplyDialog;
