import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import authFetch from "../../axiosbase/interceptors";
import { toast } from "react-toastify";

interface IDeletePageProps {
  delOpen: boolean;
  handleDelClose: Function;
  triggerRefresh: Function;
  id: string | null;
}

const DeleteMyJobs: React.FC<IDeletePageProps> = (props) => {
  const handleDelete = () => {
    if (!props.id) return;
    authFetch
      .delete(`/jobs/${props.id}`)
      .then((res) => {
        if (res.data) {
          toast.success(res.data.message);
          props.handleDelClose();
          props.triggerRefresh();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data.message);
          props.handleDelClose();
        }
      });
  };
  return (
    <div>
      <Dialog
        open={props.delOpen}
        onClose={() => {
          props.handleDelClose();
        }}
        fullWidth
        maxWidth="xs"
        slotProps={{
          backdrop: {
            style: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
          },
        }}
      >
        <DialogTitle textAlign="center" sx={{ fontSize: "35px" }}>
          Are you sure?
        </DialogTitle>
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
              props.handleDelClose();
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
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteMyJobs;
