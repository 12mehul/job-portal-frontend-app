import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import axios, { AxiosResponse } from "axios";
import { ILogin } from "../interface/ILogin";
import { toast } from "react-toastify";

const initialValues: ILogin = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const paperStyle = { padding: "30px 20px", width: 500, borderRadius: "15px" };

const Login = () => {
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, action) => {
        axios
          .post("http://localhost:4444/auth/login", values)
          .then((res: AxiosResponse) => {
            if (res.data) {
              toast.success("Login successful!");
              localStorage.setItem("uinfo", JSON.stringify(res.data));
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
              Sign In
            </Typography>
          </Grid2>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
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
              <Grid2 size={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  size="medium"
                >
                  Login
                </Button>
              </Grid2>
            </Grid2>
          </form>
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
              Not registered yet?
            </Box>
            <Box
              component="a"
              href="/register"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              Register now
            </Box>
          </Grid2>
        </Paper>
      </Grid2>
    </Container>
  );
};

export default Login;
