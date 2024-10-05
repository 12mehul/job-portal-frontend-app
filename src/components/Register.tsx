import React, { useState } from "react";
import "react-phone-input-2/lib/material.css";
import { IRegister } from "../interface/IRegister";
import { useFormik } from "formik";
import axios, { AxiosResponse } from "axios";
import {
  Box,
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
import { toast } from "react-toastify";

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
  name: Yup.string().required("Name is required"),
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
        .post("http://localhost:4444/auth/signup", values)
        .then((res: AxiosResponse) => {
          if (res.data) {
            toast.success("Registration successful!");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("type", res.data.type);
            action.resetForm();
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err.response.data.message);
          }
        });
    },
  });

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
        <Paper elevation={15} square={false} style={paperStyle}>
          <Grid2 container justifyContent="center">
            <Typography variant="h4" component="h4" color="secondary">
              Sign Up
            </Typography>
          </Grid2>
          <Grid2
            container
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <Box
              component="p"
              sx={{
                fontWeight: 500,
                color: "grey.800",
                fontSize: "1rem",
              }}
            >
              Registered yet?
            </Box>
            <Box
              component="a"
              href="/"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              Login now
            </Box>
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
                  variant="standard"
                  color="secondary"
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
                  variant="standard"
                  color="secondary"
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
                  variant="standard"
                  color="secondary"
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
                        variant="standard"
                        color="secondary"
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
                        variant="standard"
                        color="secondary"
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
                        variant="standard"
                        color="secondary"
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
                        backgroundColor: "#433878",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#7E60BF",
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
                      variant="standard"
                      color="secondary"
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
                        setFieldValue("contactNumber", `+${phone}`)
                      }
                      enableAreaCodes={true}
                      countryCodeEditable={false}
                    />
                  </Grid2>
                </>
              )}
              <Grid2 size={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  fullWidth
                  size="medium"
                  sx={{
                    padding: "8px",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
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
