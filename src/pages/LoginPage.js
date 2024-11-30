import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { username, password }
      );
      if (response.status === 200) {
        // On successful login, store login state and redirect
        localStorage.setItem("isLoggedIn", "true"); // Store login status in localStorage
        navigate("/"); // Redirect to HomePage after login
      }
    } catch (error) {
      alert("Login Failed: Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Login</h3>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <br />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </div>
  );
};

export default LoginPage;
