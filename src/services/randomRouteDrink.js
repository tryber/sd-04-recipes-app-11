const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export default function fetchRandomDrink() {
  return fetch(DRINKS_CATEGORIES_URL)
    .then((response) => response.json())
    .then((data) => data.drinks[0].idDrink);
}
