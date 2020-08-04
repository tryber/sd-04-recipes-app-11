import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import SearchInput from '../Components/SearchInput';
import { useState } from 'react';

const Header = ({ title, searcheble }) => {
  const [show, setShow] = useState(false);

  return (
    <header>
      <Link to="/perfil">
        <img src={profileImg} alt="profile" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {searcheble && (
        <img
          src={searchImg}
          alt="lupinha"
          data-testid="search-top-btn"
          onClick={() => setShow(!show)}
        />
      )}
      {show && <SearchInput />}
    </header>
  );
};

export default Header;
