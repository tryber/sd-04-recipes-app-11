import React from 'react';

const SearchInput = () => {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="food"
          id="ingredient"
        />
        ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="food"
          id="name"
        />
        Nome
      </label>
      <label htmlFor="fLetter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="food"
          id="fLetter"
        />
        Primeira letra
      </label>
      <button
        data-testid="exec-search-btn">Buscar</button>
    </div>
  );
};

export default SearchInput;
