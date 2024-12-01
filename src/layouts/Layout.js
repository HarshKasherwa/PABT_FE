import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate fetching user data with the token
      setUser({ name: "User", avatar: "/path/to/avatar.jpg" });
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate fetching user data with the token
      setUser({ name: "User", avatar: "/path/to/avatar.jpg" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
  };

  return (
    <div>
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;