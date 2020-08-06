import filterByIngredientsFoods from '../services/filterByIngredient';
import filterByIngredientsDrinks from '../services/filterByIngredientsDrinks';
import filterByFoodsName from '../services/filterByFoodsName';
import filterByFirstLetterFood from '../services/filterByFirstLetterFood';
import filterByNameDrinks from '../services/filterByNameDrink';
import filterByDrinksFirstLetter from '../services/filterByDrinksFirstLetter';

const theMessage = () => {
  alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
};

const findData = async (filter, titulo, type, setFoods, setDrinks) => {
  if (titulo === 'Comidas') {
    if (type === 'ingrediente') {
      const filteredIngredients = await filterByIngredientsFoods(filter);
      if (!filteredIngredients.meals) {
        theMessage();
      } else {
        return setFoods(filteredIngredients.meals);
      }
    }
    if (type === 'nome') {
      const filteredIngredients = await filterByFoodsName(filter);
      if (!filteredIngredients.meals) {
        theMessage();
      } else {
        return setFoods(filteredIngredients.meals);
      }
    }
    if (type === 'primeira-letra') {
      const filteredIngredients = await filterByFirstLetterFood(filter);
      if (!filteredIngredients.meals) {
        theMessage();
      } else {
        return setFoods(filteredIngredients.meals);
      }
    }
  }

  if (titulo === 'Bebidas') {
    if (type === 'ingrediente') {
      const filteredIngredients = await filterByIngredientsDrinks(filter);
      console.log(filteredIngredients);
      if (!filteredIngredients.drinks) {
        theMessage();
      } else {
        return setDrinks(filteredIngredients.drinks);
      }
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
};

export default findData;
