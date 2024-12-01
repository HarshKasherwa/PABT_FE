import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import SavedArticles from "./pages/SavedArticles";
import LoginPage from "./pages/LoginPage"; // Import the LoginPage
import SignupPage from "./pages/SignupPage"; // Import the LoginPage
import Layout from "./layouts/Layout"; // The layout component remains unchanged

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page/:title/" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Add LoginPage route */}
          <Route path="/saved-articles" element={<SavedArticles />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
