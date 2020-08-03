import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const OpenSearch = (props) => {
  const { showSearch } = useContext(AppContext);
  console.log(showSearch);
  if (showSearch) {
    return (
      <div>
        <input type="text" data-testid="search-input" />
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
  } else {
    return null;
  }
};

export default OpenSearch;