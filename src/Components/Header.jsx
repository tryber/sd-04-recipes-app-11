import React, { useContext, useState } from 'react';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = (props) => {
  const { title, setTitle } = useContext(AppContext);
 const [ showSearch, setShowSearch ] = useState(false);

  function setSearch () {
    setShowSearch(!showSearch);
    if(showSearch) return openSearch();
    return null;
  }

  const openSearch = (props) => {
    return (
      <div>
        <input type="text" data-testid="search-input"  />
        <input
          type="radio"
          value="Ingrediente"
          name="Ingrediente"
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="Ingrediente">Ingrediente</label>
        <input type="radio" value="Nome" name="Nome" data-testid="name-search-radio" />
        <label htmlFor="Nome">Nome</label>
        <input
          type="radio"
          value="Primeira-Letra"
          name="Primeira-Letra"
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="Primeira-Letra">Primeira Letra</label>

        <button>Buscar</button>
      </div>
    );
  };

  const exploreOrigins = () => {
    return (
      <div>
        <input name="explore-origin" />
        <select name="origin" id="origin">
          <option value="canada">Canadá</option> {/* Criar um map para todos os países de origem */}
        </select>
      </div>
    );
  };

  const explorerButtons = () => {
    return (
      <div>
        <Link to="/explorar/comidas">
          <button>Explorar Comidas</button>
        </Link>
        {/* Inserir a rota */}
        <Link to="/explorar/bebidas">
          <button>Explorar Bebidas</button>
        </Link>
      </div>
    );
  };

  const recipesMade = () => {
    return (
      <div>
        <input type="receitas-feitas" name="receitas-feitas" />
        {/*         <button>All</button>
        <button>Food</button>
        <button>Drinks</button> */}
      </div>
    );
  };

  const favoriteRecipes = () => {
    return (
      <div>
        <input type="text" placeholder="Receitas Favoritas" />
      </div>
    );
  };

  if (props.haveSearch) {
    return (
      <>
        <div>
          <Link to="/perfil">
            <img src={Profile} data-testid="profile-top-btn" /> 
          </Link>
          <h1 data-testid="page-title">{title}</h1>
          {props.noIcon ? (
            <div>
              {openSearch()}
              {explorerButtons()}
              {exploreOrigins()}
              {recipesMade()}
              {favoriteRecipes()}
            </div>
          ) : (
            <div>
              <img src={searchIcon} onClick={() => setSearch()} alt="searchIcon" data-testid="search-top-btn" />
              {explorerButtons()}
              {exploreOrigins()}
              {recipesMade()}
              {favoriteRecipes()}
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Link to="/perfil">
            <img src={Profile} data-testid="profile-top-btn" />
          </Link>
          <h1 data-testid="page-title">{title}</h1>
        </div>
      </>
    );
  }
};

export default Header;
