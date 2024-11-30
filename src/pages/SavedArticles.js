import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();

  // Fetch saved articles (mocked here, replace with actual API call or local storage logic)
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(storedArticles);
  }, []);

  const handleRemoveArticle = (title) => {
    const updatedArticles = savedArticles.filter((article) => article.title !== title);
    setSavedArticles(updatedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
  };

  const handleNavigateToArticle = (title) => {
    navigate(`/page/${title}`);
  };

  if (savedArticles.length === 0) {
    return <p style={{ padding: "20px" }}>No saved articles. Start saving your favorites!</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Articles</h2>
      <List>
        {savedArticles.map((article, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={article.title}
              onClick={() => handleNavigateToArticle(article.title)}
              style={{ cursor: "pointer" }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveArticle(article.title)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SavedArticles;
