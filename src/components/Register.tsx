import React, { useState } from "react";
import "react-phone-input-2/lib/material.css";
import { IRegister } from "../interface/IRegister";
import { useFormik } from "formik";
import axios, { AxiosResponse } from "axios";
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
import PhoneInput from "react-phone-input-2";

const initialValues: IRegister = {
  type: "applicant",
  name: "",
  email: "",
  password: "",
  bio: "",
  contactNumber: "",
  education: [{ institutionName: "", startYear: "", endYear: "" }],
  skills: [],
};

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const paperStyle = { padding: "30px 20px", width: 500, borderRadius: "15px" };

const Register = () => {
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      if (!values.skills.includes(skillInput.trim())) {
        setFieldValue("skills", [...values.skills, skillInput.trim()]);
      }
      setSkillInput("");
      e.preventDefault();
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setFieldValue(
      "skills",
      values.skills.filter((skill) => skill !== skillToDelete)
    );
  };

  const handleChangeEducation = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newEducations = [...values.education];
    newEducations[index] = { ...newEducations[index], [name]: value };
    setFieldValue("education", newEducations);
  };

  const handleAddEducation = () => {
    setFieldValue("education", [
      ...values.education,
      { institutionName: "", startYear: "", endYear: "" },
    ]);
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
      axios
        .post(
          "https://66e066f02fb67ac16f2981b3.mockapi.io/api/users/register",
          values
        )
        .then((res: AxiosResponse) => {
          if (res.data) {
            action.resetForm();
          }
        })
        .catch((err) => console.log(err));
    },
  });
  console.log(values);

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Paper elevation={20} square={false} style={paperStyle}>
          <Grid2 container justifyContent="center">
            <Typography
              variant="h4"
              component="h4"
              className="text-purple-600"
              sx={{ marginBottom: "20px" }}
            >
              Sign Up
            </Typography>
          </Grid2>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              <Grid2 size={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="applicant">Applicant</MenuItem>
                    <MenuItem value="recruiter">Recruiter</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  color="primary"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  color="primary"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  color="primary"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid2>
              {values.type === "applicant" ? (
                <>
                  {values.education.map((item, index) => (
                    <Grid2
                      size={12}
                      key={index}
                      sx={{
                        display: "flex",
                      }}
                    >
                      <TextField
                        label={`Institution Name#${index}`}
                        variant="outlined"
                        color="primary"
                        type="text"
                        fullWidth
                        name="institutionName"
                        value={item.institutionName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChangeEducation(e, index)
                        }
                      />
                      <TextField
                        label="Start Year"
                        variant="outlined"
                        color="primary"
                        type="number"
                        fullWidth
                        name="startYear"
                        value={item.startYear}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChangeEducation(e, index)
                        }
                      />
                      <TextField
                        label="End Year"
                        variant="outlined"
                        color="primary"
                        type="number"
                        fullWidth
                        name="endYear"
                        value={item.endYear}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChangeEducation(e, index)
                        }
                      />
                    </Grid2>
                  ))}
                  <Grid2 size={12}>
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: 500,
                        backgroundColor: "#ff4ab1",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#ff5eba",
                        },
                      }}
                      type="button"
                      fullWidth
                      size="medium"
                      onClick={handleAddEducation}
                    >
                      ADD ANOTHER INSTITUTION DETAILS
                    </Button>
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      label="Skills"
                      variant="outlined"
                      color="primary"
                      placeholder="Press Enter to add skills"
                      fullWidth
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    {values.skills.length > 0 && (
                      <div>
                        {values.skills.map((skill, index) => (
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
                </>
              ) : (
                <>
                  <Grid2 size={12}>
                    <TextField
                      label="Bio (upto 250 words)"
                      variant="outlined"
                      color="primary"
                      type="text"
                      name="bio"
                      fullWidth
                      multiline
                      rows={4}
                      value={values.bio}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <PhoneInput
                      country={"in"}
                      value={values.contactNumber}
                      onChange={(phone) =>
                        setFieldValue("contactNumber", phone)
                      }
                    />
                  </Grid2>
                </>
              )}
              <Grid2 size={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  size="medium"
                >
                  Register
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Paper>
      </Grid2>
    </Container>
  );
};

export default Register;
