export default function filterByNameDrinks(ingredients) {
  console.log('entrou aqui fetch name drinks');
  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ingredients}`,
  ).then((response) => response.json());
}
