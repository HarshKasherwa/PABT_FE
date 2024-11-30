import React, { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const FloatingSaveButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle hover state change
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "80px", // Adjust this value to position below the header
        right: "60px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Tooltip that appears on hover */}
      <Tooltip title="Save Article" open={isHovered}>
        <Button
          style={{
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#3f51b5",
            color: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            minWidth: "50px",
            minHeight: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            position: "relative",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SaveIcon />
        </Button>
      </Tooltip>

      {/* The Save Article text shown on hover */}
      {isHovered && (
        <div
          style={{
            marginTop: "10px",
            color: "#3f51b5",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {/* Save Article */}
        </div>
      )}
    </div>
  );
};

export default FloatingSaveButton;
