import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../uitls/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const defaultTheme = createTheme();

const Signup = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );
      console.log("Signup successfull ", response);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignupClick = () => {
    navigate("/login");
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputChange}
                    value={formValue.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="new-password"
                    onChange={handleInputChange}
                    value={formValue.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link onClick={handleSignupClick} variant="body2">
                    Already have an account? sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Signup;
