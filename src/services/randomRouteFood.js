const FOODS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

export default function fetchRandomFood() {
  return fetch(FOODS_CATEGORIES_URL)
    .then((response) => response.json())
    .then((data) => data.meals[0].idMeal);
}
