import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import OpenSearch from './OpenSearch';

const Header = (props) => {
  const { title, showSearch, setShowSearch } = useContext(AppContext);

  if (props.haveSearch) {
    return (
      <div>
        <Link to="/perfil">
          <img src={Profile} data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {props.noIcon ? (
          <div></div>
        ) : (
          <div>
            <img
              src={searchIcon}
              onClick={() => setShowSearch(!showSearch)}
              alt="searchIcon"
              data-testid="search-top-btn"
            />
            <OpenSearch />
          </div>
        )}
      </div>
    );
  }
  {
    return (
      <div>
        <Link to="/perfil">
          <img src={Profile} data-testid="profile-top-btn" alt="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
      </div>
    );
  }
};

export default Header;
