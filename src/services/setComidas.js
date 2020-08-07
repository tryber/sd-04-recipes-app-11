import filterByIngredientsFoods from '../services/filterByIngredient';
/* import filterByIngredientsDrinks from '../services/filterByIngredientsDrinks';
import filterByFoodsName from '../services/filterByFoodsName';
import filterByFirstLetterFood from '../services/filterByFirstLetterFood';
import filterByNameDrinks from '../services/filterByNameDrink';
import filterByDrinksFirstLetter from '../services/filterByDrinksFirstLetter'; */
import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const theMessage = () => {
  alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
};

export const fetchFoodsIngredients = async (filter, type) => {
  const { setFilteredFoods } = useContext(AppContext);

  if (type === 'ingrediente') {
    const filteredIngredients = await filterByIngredientsFoods(filter);
    return filteredIngredients;
  }
};

export function returnFilteredMealsByIngredients() {


  if (!fetchFoodsIngredients.meals) {
    theMessage();
  } else {
    const meals = fetchFoodsIngredients.meals;
    return setFilteredFoods(meals);
  }
}

