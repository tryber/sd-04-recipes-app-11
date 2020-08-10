export default function filterByFirstLetterFood(ingredients) {
  console.log('entrou aqui fetch filters by first letter');
  return fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${ingredients}`,
  ).then((response) => response.json());
}
