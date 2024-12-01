import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/get_current_user`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };
    fetchUsername();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Personal Article Bookmark Tool
        </Typography>

        {user && (
          <Button color="inherit" onClick={() => navigate("/saved-articles")}>
            Saved Articles
          </Button>
        )}

        {user ? (
          <>
            <Avatar
              alt={user.name}
              src={user.avatar}
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={handleMenuOpen}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{username}</MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => {
            onLogin();
            navigate("/login");
          }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;