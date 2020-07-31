const MEALS_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function getFoods() {
  return fetch(MEALS_API_URL).then((response) => response.json());
}
