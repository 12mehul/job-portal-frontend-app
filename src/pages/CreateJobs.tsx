import React, { useState } from "react";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";
import {
  Button,
  Chip,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";
import authFetch from "../axiosbase/interceptors";
import { ICreateJob } from "../interface/IJob";

const initialValues: ICreateJob = {
  title: "",
  maxApplicants: 100,
  maxPositions: 30,
  deadline: new Date().toISOString(),
  skillsets: [],
  jobType: "Full Time",
  duration: 0,
  salary: 0,
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const paperStyle = {
  padding: "30px 20px",
  borderRadius: "15px",
  width: "100%",
};

const CreateJobs = () => {
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      if (!values.skillsets.includes(skillInput.trim())) {
        setFieldValue("skillsets", [...values.skillsets, skillInput.trim()]);
      }
      setSkillInput("");
      e.preventDefault();
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setFieldValue(
      "skillsets",
      values.skillsets.filter((skill) => skill !== skillToDelete)
    );
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      authFetch
        .post("/jobs", values)
        .then((res: AxiosResponse) => {
          if (res.data) {
            toast.success(res.data.message);
            setSkillInput("");
            action.resetForm();
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err.response.data.message);
          }
        });
    },
  });
  console.log(values);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", padding: "18px" }}>
      <Paper elevation={5} square={false} style={paperStyle}>
        <Grid2 container justifyContent="center">
          <Typography variant="h4" component="h4" color="secondary">
            Create Job
          </Typography>
        </Grid2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <TextField
                label="Title"
                variant="standard"
                color="secondary"
                type="text"
                name="title"
                placeholder="Enter title"
                fullWidth
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Skills"
                variant="standard"
                color="secondary"
                placeholder="Press Enter to add skills"
                fullWidth
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
              />
            </Grid2>
            <Grid2 size={12}>
              {values.skillsets.length > 0 && (
                <div>
                  {values.skillsets.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleDeleteSkill(skill)}
                      sx={{ margin: "2px" }}
                    />
                  ))}
                </div>
              )}
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  label="Job Type"
                  color="secondary"
                  name="jobType"
                  value={values.jobType}
                  onChange={handleChange}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Work From Home">Work From Home</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  label="Duration"
                  color="secondary"
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Flexible</MenuItem>
                  <MenuItem value={1}>1 Month</MenuItem>
                  <MenuItem value={2}>2 Months</MenuItem>
                  <MenuItem value={3}>3 Months</MenuItem>
                  <MenuItem value={4}>4 Months</MenuItem>
                  <MenuItem value={5}>5 Months</MenuItem>
                  <MenuItem value={6}>6 Months</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Salary"
                variant="standard"
                color="secondary"
                type="number"
                name="salary"
                fullWidth
                value={values.salary}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Application Deadline"
                variant="standard"
                color="secondary"
                type="date"
                name="deadline"
                fullWidth
                value={values.deadline}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Maximum Number Of Applicants"
                variant="standard"
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
                variant="standard"
                color="secondary"
                type="number"
                name="maxPositions"
                fullWidth
                value={values.maxPositions}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 container justifyContent="center" sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="medium"
                sx={{
                  padding: "9px 30px",
                  fontSize: "15px",
                }}
              >
                Create Job
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateJobs;
