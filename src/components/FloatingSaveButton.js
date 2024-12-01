import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const FloatingSaveButton = ({ articleTitle, tags }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Check if the article is saved by fetching the list of saved articles
  useEffect(() => {
    const fetchSavedArticles = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Fetch saved articles from the backend
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/crud_article/saved_articles_list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Check if the current article title exists in the list of saved articles
          const savedArticles = response.data.titles || [];
          if (savedArticles.includes(articleTitle)) {
            setIsSaved(true); // Set isSaved to true if title is in saved articles
          } else {
            setIsSaved(false); // Reset to false if it's not in the list
          }
        } catch (error) {
          console.error("Error fetching saved articles:", error);
        }
      }
    };

    fetchSavedArticles();
  }, [articleTitle]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleSaveArticle = async () => {
    const token = localStorage.getItem("token");
    console.log(`token`, token);
    console.log(`title`, articleTitle);

    // Tags that are being passed for the article
//    const tags = ["tag1", "tag2"]; // Replace this with dynamic tags as needed

    if (token) {
      // try {
      //   const response = await axios.post(
      //     `${process.env.REACT_APP_API_URL}/crud_article/save_article?title=${articleTitle}`,
      //     {data: { 'tags': tags }}, // Include the tags in the request body
      //     {
      //       headers: {
      //         // Authorization: `Bearer ${token}`,
      //         'accept': 'application/json',
      //         'Content-Type': 'application/json', // Ensure correct content type
      //       },
      //     }
      //   );
      try {
        let headersList = {
          "Accept": "*/*",
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json" 
         }
         
         let bodyContent = JSON.stringify(tags);
         
         let reqOptions = {
           url: `${process.env.REACT_APP_API_URL}/crud_article/save_article?title=${articleTitle}`,
           method: "POST",
           headers: headersList,
           data: bodyContent,
         }
         
         let response = await axios.request(reqOptions);
         console.log(response.data);
        console.log(response.data)
        setIsSaved(true);
      } catch (error) {
        console.error("Error saving article:", error);
      }
    }
  };

  if (isSaved) {
    return null; // Remove the button once the article is saved
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",  // Position the button near the bottom
        right: "180px",   // Position the button near the right edge
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
          onClick={handleSaveArticle}
        >
          <SaveIcon />
        </Button>
      </Tooltip>

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
