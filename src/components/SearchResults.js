// SearchResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


const SearchResults = () => {
  const { query } = useParams(); // Get search query from URL
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSearchResults(query); // Fetch search results when the component mounts
  }, [query]);

  const fetchSearchResults = async (searchQuery) => {
    setLoading(true);
    const API_KEY = '127b384e23aa19a9d32db8a5d24498c9';
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movies-container">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                 </Link>
                <p>{movie.title}</p>
             
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
