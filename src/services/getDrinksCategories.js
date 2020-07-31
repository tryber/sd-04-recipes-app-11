const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export default function getDrinksCategories() {
  return fetch(DRINKS_CATEGORIES_URL).then((response) => response.json());
}
