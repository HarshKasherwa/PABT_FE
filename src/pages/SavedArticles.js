import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();

    const fetchSavedArticles = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/crud_article/get_articles`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setSavedArticles(response.data);
        } catch (error) {
          console.error("Error fetching saved articles:", error);
        }
      }
    };

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  const handleRemoveArticle = async (articleId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/crud_article/delete_article?articleId=${articleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSavedArticles(); // Refetch the articles after deletion
      } catch (error) {
        console.error("Error removing article:", error);
      }
    }
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tags</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {savedArticles.map((article, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => handleNavigateToArticle(article.title)} style={{ cursor: "pointer" }}>
                  {article.title}
                </TableCell>
                <TableCell>
                  {article.tags && (
                    <Box component="span" sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '0.875rem' }}>
                      {article.tags.map((tag, tagIndex) => (
                        <Box
                          key={tagIndex}
                          sx={{
                            padding: '5px 10px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveArticle(article.articleId)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SavedArticles;