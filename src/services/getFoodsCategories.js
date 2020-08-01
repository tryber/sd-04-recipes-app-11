const FOODS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export default function getDrinksCategories() {
  return fetch(FOODS_CATEGORIES_URL).then((response) => response.json());
}
