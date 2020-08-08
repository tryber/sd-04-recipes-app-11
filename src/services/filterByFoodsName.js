// const url = https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}

export default function filterByFoodsName(ingredients) {
  console.log('entrou aqui fetch drinks');
  return fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredients}`,
  ).then((response) => response.json());
}
