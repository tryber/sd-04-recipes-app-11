const fetchByIngredients = () =>
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list').then((data) => data.json());

export default fetchByIngredients;
