import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import findData from '../services/findDataFromRadio';

const SearchInput = (props) => {
  const {
    filteredWith,
    setFilteredWith,
    fLetter,
    setFletter,
    setFilteredFoods,
    setFilteredDrinks,
  } = useContext(AppContext);

  const { title } = props;
  console.log(title);

  function firstLetter() {
    setFilteredWith('primeira-letra');
  }

  function fillMessage(letter) {
    setFletter(letter);
    if (fLetter.length > 0 && filteredWith === 'primeira-letra') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={fLetter}
        onChange={(e) => fillMessage(e.target.value)}
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="food"
          id="ingredient"
          onClick={() => setFilteredWith('ingrediente')}
        />
        ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="food"
          id="name"
          onClick={() => setFilteredWith('nome')}
        />
        Nome
      </label>
      <label htmlFor="fLetter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="food"
          id="fLetter"
          onClick={() => firstLetter()}
        />
        Primeira letra
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={() => {
          findData(fLetter, props.title, filteredWith, setFilteredFoods, setFilteredDrinks);
          // if(filteredDrinks === [] || filteredFoods === [] )
          // return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        }}
      >
        Buscar
      </button>
    </div>
  );
};

SearchInput.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchInput;
