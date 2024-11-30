import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce"; // Install lodash for utility functions
import { TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/search2?keyword=${searchQuery}`);
      setResults(response.data.pages || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }
    debouncedFetchResults(value);
  };

  useEffect(() => {
    return () => {
      debouncedFetchResults.cancel(); // Cleanup debounce on component unmount
    };
  }, [debouncedFetchResults]);

  // Navigate to the Wikipedia page in your app
  const handleItemClick = (title) => {
    navigate(`/page/${title}`); // Navigate to the page route
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        autoComplete="off"
      />
      {loading && <CircularProgress size={24} style={{ margin: "10px auto", display: "block" }} />}
      <List>
        {results.map((page) => {
          const displayTitle = page.title;
          const articleDescription = page.description ?? "A Wikipedia article"; // Fallback to default description
          const thumbnailUrl =
            page.thumbnail?.url
              ? `https:${page.thumbnail.url}`
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/200px-Wikipedia-logo-v2.svg.png"; // Fallback to Wikipedia logo

          return (
            <ListItem
              key={page.id}
              button
              onClick={() => handleItemClick(page.title)} // Use the click handler to navigate to the page
            >
              <ListItemAvatar>
                <Avatar
                  src={thumbnailUrl}
                  alt={displayTitle}
                  variant="square" // Makes the Avatar square
                  sx={{
                    width: 40, // Set desired width
                    height: 40, // Set the same value for height
                  }}
                />
              </ListItemAvatar>
              <ListItemText primary={displayTitle} secondary={articleDescription} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SearchBar;
