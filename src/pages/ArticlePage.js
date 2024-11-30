import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FloatingSaveButton from "../components/FloatingSaveButton"; // Import the floating button component

const ArticlePage = () => {
  const { title } = useParams(); // Get the title from the URL params
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/get_page?title=${title}`
        );
        setContent(response.data); // Set the plain text content
      } catch (err) {
        setError("Failed to fetch content");
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [title]);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>{title.replace(/_/g, " ")}</h1> {/* Display the title with spaces */}
      <div style={{ whiteSpace: "pre-wrap" }}>{content}</div> {/* Display the article content */}
      <FloatingSaveButton /> {/* Floating save button component */}
    </div>
  );
};

export default ArticlePage;
