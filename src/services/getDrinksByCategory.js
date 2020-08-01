export default function getDrinksByCategory(category) {
  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  ).then((response) => response.json());
}
