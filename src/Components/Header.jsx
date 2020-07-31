import React from 'react';
import { render } from '@testing-library/react';
import { Link, Redirect, Router } from 'react-router-dom';
import { ExploreFoods } from '../pages/ExploreFoods';

const Header = (props) => {
  const { title } = props;

  const openSearch = (props) => {
    return (
      <div>
        <input type="text" />
        <input type="radio" value="Ingrediente" name="Ingrediente" />
        <label htmlFor="Ingrediente">Ingrediente</label>
        <input type="radio" value="Nome" name="Nome" />
        <label htmlFor="Nome">Nome</label>
        <input type="radio" value="Primeira-Letra" name="Primeira-Letra" />
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
        <Router>
        <Link to="/explorar/comidas">
          <button>Explorar Comidas</button>
        </Link>
        {/* Inserir a rota */}
        <button>Explorar Bebidas</button>
      </div>
    );
  };

  const receiptsMade = () => {
    return (
      <div>
        <input type="receitas-feitas" name="receitas-feitas" />
        <button>All</button>
        <button>Food</button>
        <button>Drinks</button>
      </div>
    );
  };

  const favoriteReceipts = () => {
    return (
      <div>
        <input type="text" placeholder="Receitas Favoritas" />
      </div>
    );
  };

  return (
    <>
      <div>
        <button>Perfil</button>
        <h1>{title}</h1>
        {openSearch()}
        {explorerButtons()}
        {exploreOrigins()}
        {receiptsMade()}
        {favoriteReceipts()}
      </div>
    </>
  );
};

export default Header;
