import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";
import Modal from "react-modal"; // Import react-modal

// Set modal root element
Modal.setAppElement("#root");

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMovieDetails();
    fetchTrailer(); // Fetch the trailer when component mounts
    checkFavorite();
  }, [id]);

  const fetchMovieDetails = async () => {
    const API_KEY = "127b384e23aa19a9d32db8a5d24498c9";
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchTrailer = async () => {
    const API_KEY = "127b384e23aa19a9d32db8a5d24498c9";
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const trailer = response.data.results.find(
        (vid) => vid.type === "Trailer"
      );
      if (trailer) {
        setTrailerKey(trailer.key); // Store the trailer key for YouTube video
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };
  // Check if the movie is in favorites
  const checkFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === parseInt(id)));
  };

  // Add or remove from favorites
  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const openModal = () => setIsModalOpen(true); // Function to open modal
  const closeModal = () => setIsModalOpen(false); // Function to close modal

  // Function to handle closing the details page and going back
  const handleClose = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div className="movie-details">
      {loading ? (
        <p>Loading...</p>
      ) : movie ? (
        <div>
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>

          {/* Add/Remove from Favorites */}
          <button onClick={handleFavorite} className="favorite-btn">
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

          {/* Button to watch trailer */}
          <button onClick={openModal} className="watch-trailer-btn">
            Watch Trailer
          </button>

          {/* Close button to go back */}
          <button onClick={handleClose} className="close-btn">
            Close
          </button>

          {/* Modal for trailer */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Trailer Modal"
            className="trailer-modal"
            overlayClassName="trailer-overlay"
          >
            {trailerKey ? (
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Movie Trailer"
              ></iframe>
            ) : (
              <p>No trailer available</p>
            )}
          </Modal>
        </div>
      ) : (
        <p>Movie not found.</p>
      )}
    </div>
  );
};

export default MovieDetails;
