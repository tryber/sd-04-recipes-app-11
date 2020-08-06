import PropTypes from 'prop-types';
import React from 'react';
import filterByIngredientsFoods from '../services/filterByIngredient';
import filterByIngredientsDrinks from '../services/filterByIngredientsDrinks';
import filterByFoodsName from '../services/filterByFoodsName';
import filterByFirstLetterFood from '../services/filterByFirstLetterFood';
import filterByNameDrinks from '../services/filterByNameDrink';
import filterByDrinksFirstLetter from '../services/filterByDrinksFirstLetter';


const findData = async(filter, titulo, type, setFoods, setDrinks) => {

  if (titulo === 'Comidas') {
    if (type === 'ingrediente') {
      const filteredIngredients = await filterByIngredientsFoods(filter);
      console.log(filteredIngredients);
      return setFoods(filteredIngredients.meals ? filteredIngredients.meals : []);
    }
    if (type === 'nome') {
      const filteredIngredients = await filterByFoodsName(filter);
      console.log(filteredIngredients);
      return setFoods(filteredIngredients.meals ? filteredIngredients.meals : []);
    }
    if (type === 'primeira-letra') {
      const filteredIngredients = await filterByFirstLetterFood(filter);
      return setFoods(filteredIngredients.meals ? filteredIngredients.meals : []);
    }
  }

  if (titulo === 'Bebidas') {
    console.log('entrou em bebidas');
    if (type === 'ingrediente') {
      const filteredIngredients = await filterByIngredientsDrinks(filter);
      return setDrinks(filteredIngredients.drinks ? filteredIngredients.drinks : []);
    }
    if (type === 'nome') {
      const filteredIngredients = await filterByNameDrinks(filter);
      return setDrinks(filteredIngredients.drinks ? filteredIngredients.drinks : []);
    }
    if (type === 'primeira-letra') {
      const filteredIngredients = await filterByDrinksFirstLetter(filter);
      return setDrinks(filteredIngredients.drinks ? filteredIngredients.drinks : []);
    }
  }
}

export default findData;