// const url = https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}

export default function filterByIngredientsFoods(ingredients) {
  console.log('entrou aqui fetch');
  return fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`,
  ).then((response) => response.json());
}
