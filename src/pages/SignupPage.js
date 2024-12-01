import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup?username=${username}&password=${password}`,
      );
      if (response.status === 200) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      alert("Signup Failed: " + error.response.data.detail);
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
        <h3 style={{ textAlign: "center" }}>Sign Up</h3>
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
          onClick={handleSignup}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        <Typography style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account? <Link to="/login"> Log in </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupPage;