import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesPage.css'

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites-page">
   
      {favorites.length === 0 ? (
        <p>No favorite movies added.</p>
      ) : (
        <div className="favorite-movies-grid">
          {favorites.map(movie => (
            <div key={movie.id} className="favorite-movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="favorite-movie-poster"
                />
                 </Link>
                <p>{movie.title}</p>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
