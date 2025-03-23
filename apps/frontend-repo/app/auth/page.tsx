"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "@/providers/AuthProvider";

const Auth = () => {
  const auth = useAuth();
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.currentTarget.email.value;
          const password = e.currentTarget.password.value;
          auth.signIn(email, password);
        }}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "text.primary",
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" component="h1">
          Sign in
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField label="Email" name="email" variant="outlined" />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Sign in
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Auth;
