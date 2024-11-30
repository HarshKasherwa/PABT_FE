import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce"; // Install lodash for debounce
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For programmatic navigation

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleItemClick = (title) => {
    navigate(`/page/${title}`); // Redirect to the article page
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <TextField
        fullWidth
        label="Search Wikipedia"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        autoComplete="off"
      />
      {loading && <CircularProgress size={24} style={{ margin: "10px auto", display: "block" }} />}
      <List>
        {results.map((page) => {
          const displayTitle = page.title;
          const articleDescription = page.description || "A Wikipedia article";
          const thumbnailUrl = page.thumbnail?.url
            ? `https:${page.thumbnail.url}`
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/200px-Wikipedia-logo-v2.svg.png"; // Fallback thumbnail

          return (
            <ListItem
              key={page.id}
              button
              onClick={() => handleItemClick(page.title)}
            >
              <ListItemAvatar>
                <Avatar
                  src={thumbnailUrl}
                  alt={displayTitle}
                  variant="square"
                  sx={{
                    width: 40,
                    height: 40,
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
