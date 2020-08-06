// const url = https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}

export default function filterByIngredientsDrinks(ingredients) {
  console.log('entrou aqui fetch drinks');
  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`,
  ).then((response) => response.json());
}
