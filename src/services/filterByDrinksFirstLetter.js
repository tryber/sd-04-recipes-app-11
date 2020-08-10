export default function filterByDrinksFirstLetter(ingredients) {
  console.log('entrou aqui fetch first Letter');
  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${ingredients}`,
  ).then((response) => response.json());
}
