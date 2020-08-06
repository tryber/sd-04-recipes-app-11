import filterByIngredientsFoods from '../services/filterByIngredient';
import filterByIngredientsDrinks from '../services/filterByIngredientsDrinks';
import filterByFoodsName from '../services/filterByFoodsName';
import filterByFirstLetterFood from '../services/filterByFirstLetterFood';
import filterByNameDrinks from '../services/filterByNameDrink';
import filterByDrinksFirstLetter from '../services/filterByDrinksFirstLetter';

const theMessage = () => {
  alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
};

function setContextFoods(filteredIngredients, setFoods) {
  if (!filteredIngredients.meals) {
    theMessage();
    return setFoods([]);
  }
  return setFoods(filteredIngredients.meals);
}

async function filterFoods(filter, type, setFoods) {
  if (type === 'ingrediente') {
    const filteredIngredients = await filterByIngredientsFoods(filter);
    setContextFoods(filteredIngredients, setFoods);
  }

  if (type === 'nome') {
    const filteredIngredients = await filterByFoodsName(filter);
    setContextFoods(filteredIngredients, setFoods);
  }

  if (type === 'primeira-letra') {
    const filteredIngredients = await filterByFirstLetterFood(filter);
    setContextFoods(filteredIngredients, setFoods);
  }
}

function setContextDrinks(filteredIngredients, setDrinks) {
  if (!filteredIngredients.drinks) {
    theMessage();
    return setDrinks([]);
  }
  return setDrinks(filteredIngredients.drinks);
}

async function filterDrinks(filter, type, setDrinks) {
  if (type === 'ingrediente') {
    const filteredIngredients = await filterByIngredientsDrinks(filter);
    setContextDrinks(filteredIngredients, setDrinks);
  }

  if (type === 'nome') {
    const filteredIngredients = await filterByNameDrinks(filter);
    setContextDrinks(filteredIngredients, setDrinks);
  }

  if (type === 'primeira-letra') {
    const filteredIngredients = await filterByDrinksFirstLetter(filter);
    setDrinks(filteredIngredients.drinks ? filteredIngredients.drinks : []);
  }
}

const findData = async (filter, titulo, type, setFoods, setDrinks) => {
  if (titulo === 'Comidas') return filterFoods(filter, type, setFoods);
  if (titulo === 'Bebidas') return filterDrinks(filter, type, setDrinks);
};

export default findData;
