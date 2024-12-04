// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Function to handle search
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value;  // Get the search input value
    navigate(`/search/${query}`);  // Navigate to the search results page
  };

  return (
    <nav className="navbar">
      <div className="left-side">
        <Link to="/" className="nav-brand">MovieApp</Link>  {/* MovieApp Brand */}
        <Link to="/favorites" className="nav-link">Favorites</Link>  {/* Favorites Link */}
      </div>
      
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search for a movie..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
