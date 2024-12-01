import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login?username=${username}&password=${password}`,
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
        window.location.reload(); // Reload the page to update the header
      }
    } catch (error) {
      alert("Login Failed: Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px", width: "100%" }}>
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        <Typography style={{ marginTop: "20px", textAlign: "center" }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;