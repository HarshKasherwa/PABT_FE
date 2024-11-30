import React from "react";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const user = null; // Simulate user state

  const handleLogin = () => {
    console.log("Login Clicked!");
  };

  const handleLogout = () => {
    console.log("Logout Clicked!");
  };

  return (
    <div>
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
