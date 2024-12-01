import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FloatingSaveButton from "../components/FloatingSaveButton"; // Import the floating button component

const ArticlePage = () => {
  const { title } = useParams(); // Get the title from the URL params
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const hasFetchedData = useRef(false); // Ref to track if data has been fetched


  useEffect(() => {
    if (hasFetchedData.current) return; // Prevent multiple calls
    hasFetchedData.current = true;
    const fetchData = async () => {
      try {
        const pageResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/get_page?title=${title}`
        );
        setContent(pageResponse.data); // Set the plain text content

        const tagsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/tagger/generate_tags?article_title=${title}`
        );
        setTags(tagsResponse.data.tags || []); // Assuming response contains tags
      } catch (err) {
        setError("Failed to fetch content or tags");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        margin: "0 auto",
        maxWidth: "1200px",
      }}
    >
      {/* Left Section - Article Content */}
      <div
        style={{
          flex: 0.75, // Left section takes up 60% of the width
          paddingRight: "20px",
          overflowY: "auto",
        }}
      >
        <h1>{title.replace(/_/g, " ")}</h1> {/* Display the title with spaces */}
        <div style={{ whiteSpace: "pre-wrap" }}>{content}</div> {/* Display the article content */}
      </div>

      {/* Right Section - Tags and Floating Save Button */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          width: "250px",
          padding: "20px",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <h3>AI-Generated Tags</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {tags.map((tag, index) => (
            <div
              key={index}
              style={{
                padding: "5px 10px",
                backgroundColor: "#e0e0e0",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <FloatingSaveButton articleTitle={title} tags={tags} />
      </div>
    </div>
  );
};

export default ArticlePage;
