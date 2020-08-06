import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import filterByIngredientsFoods from '../services/filterByIngredient';
import filterByIngredientsDrinks from '../services/filterByIngredientsDrinks';
import filterByFoodsName from '../services/filterByFoodsName';
import filterByFirstLetterFood from '../services/filterByFirstLetterFood';
import filterByNameDrinks from '../services/filterByNameDrink';
import filterByDrinksFirstLetter from '../services/filterByDrinksFirstLetter';
import { useEffect } from 'react';

const SearchInput = (props) => {
  const {
    filteredWith,
    setFilteredWith,
    fLetter,
    setFletter,
    filteredFoods,
    setFilteredFoods,
    filteredDrinks,
    setFilteredDrinks,
  } = useContext(AppContext);

  const { title } = props;
  console.log(title);

  function firstLetter() {
    setFilteredWith('primeira-letra');
  }

  /*  useEffect(() => {
    if(filteredFoods.length === 0 && title === 'Comidas') return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }); */

  async function findData(filter, title, type) {
    if (title === 'Comidas') {
      if (type === 'ingrediente') {
        const filteredIngredients = await filterByIngredientsFoods(filter);
        console.log(filteredIngredients);
        return setFilteredFoods(filteredIngredients.meals ? filteredIngredients.meals : []);
      }
      if (type === 'nome') {
        const filteredIngredients = await filterByFoodsName(filter);
        console.log(filteredIngredients);
        return setFilteredFoods(filteredIngredients.meals ? filteredIngredients.meals : []);
      }
      if (type === 'primeira-letra') {
        const filteredIngredients = await filterByFirstLetterFood(filter);
        return setFilteredFoods(filteredIngredients.meals ? filteredIngredients.meals : []);
      }
    }

    if (title === 'Bebidas') {
      console.log('entrou em bebidas');
      if (type === 'ingrediente') {
        const filteredIngredients = await filterByIngredientsDrinks(filter);
        return setFilteredDrinks(filteredIngredients.drinks ? filteredIngredients.drinks : []);
      }
      if (type === 'nome') {
        const filteredIngredients = await filterByNameDrinks(filter);
        return setFilteredDrinks(filteredIngredients.drinks ? filteredIngredients.drinks : []);
      }
      if (type === 'primeira-letra') {
        const filteredIngredients = await filterByDrinksFirstLetter(filter);
        return setFilteredDrinks(filteredIngredients.drinks ? filteredIngredients.drinks : []);
      }
    }
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
          findData(fLetter, props.title, filteredWith);
          // if(filteredDrinks === [] || filteredFoods === [] ) return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        }}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchInput;
