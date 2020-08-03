const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function getDrinks() {
  return fetch(DRINKS_API_URL).then((response) => response.json());
}
