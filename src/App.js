import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Update import

import SearchBar from './components/SearchBar';  // Importing SearchBar
import Page from './components/Page';  // Importing WikipediaPage

const App = () => {
  return (
    <Router>
      <Routes>  {/* Use Routes instead of Switch */}
        <Route path="/" element={<SearchBar />} />  {/* Updated to use element prop */}
        <Route path="/page/:title" element={<Page />} />  {/* Updated to use element prop */}
      </Routes>
    </Router>
  );
};

export default App;
