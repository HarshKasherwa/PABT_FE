import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Welcome to the Personal Article Bookmark Tool</h3>
      <SearchBar /> {/* This will show the search bar */}
    </div>
  );
};

export default HomePage;
