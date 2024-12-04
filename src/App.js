import React from "react";
import MovieList from "./components/MovieList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieDetails from "./components/MovieDetails";
import FavoritesPage from "./components/FavoritesPage"; 
import SearchResults from "./components/SearchResults";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
