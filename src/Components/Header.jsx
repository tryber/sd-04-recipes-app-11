import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const Header = (props) => {

  const { title, setTitle }= useContext(AppContext);

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

  const receiptsMade = () => {
    return (
      <div>
        <input type="receitas-feitas" name="receitas-feitas" />
{/*         <button>All</button>
        <button>Food</button>
        <button>Drinks</button> */}
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
        <Link to="/perfil" >
        <button>Perfil</button>
        </Link>
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
