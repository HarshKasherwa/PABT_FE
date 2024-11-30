import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" style={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Personal Article Bookmark Tool
        </Typography>

        {/* Saved Articles */}
        {user && (
          <Button color="inherit" onClick={() => navigate("/saved-articles")}>
            Saved Articles
          </Button>
        )}

        {/* Login/User */}
        {user ? (
          <Avatar
            alt={user.name}
            src={user.avatar}
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={onLogout}
          />
        ) : (
          <Button color="inherit" onClick={onLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
