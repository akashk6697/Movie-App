
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Store the total number of pages

  useEffect(() => {
    fetchMovies(page); // Fetch movies based on the current page
  }, [page]);

  const fetchMovies = async (pageNumber) => {
    setLoading(true);
    const API_KEY = '127b384e23aa19a9d32db8a5d24498c9';
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNumber}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages); // Get total pages from the response
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  // Handle pagination: Move to the next page
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Handle pagination: Move to the previous page
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="movie-list">
    
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movies-grid">
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
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={page === 1} // Disable previous button on the first page
          className="pagination-btn"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages} // Disable next button on the last page
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
