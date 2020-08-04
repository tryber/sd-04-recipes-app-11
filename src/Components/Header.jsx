import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchInput from './SearchInput';

const Header = ({ title, searchble }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      <Link to="/perfil">
        <img
          src={profile}
          data-testid="profile-top-btn"
          alt="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {searchble && (
        <button
          style={{ background: 'none', border: 'none' }}
          onClick={() => setShowSearch(!showSearch)}
        >
          <img src={searchIcon} alt="searchIcon" data-testid="search-top-btn" />
        </button>
      )}
      {showSearch && <SearchInput />}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchble: PropTypes.bool.isRequired,
};

export default Header;
