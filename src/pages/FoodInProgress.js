import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// import copyToClipboard from 'clipboard-copy';
import getFoodById from '../services/getFoodById';
import { AppContext } from '../context/AppContext';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import './InProgress.css';
import Buttons from '../Components/Buttons';
import Func from '../Components/Func';

// function favoriteToLocalStorage(recipe) {
//   const {
//     idMeal: id,
//     strCategory: category,
//     strArea: area,
//     strMeal: name,
//     strMealThumb: image,
//   } = recipe;
//   const type = 'comida';
//   const alcoholicOrNot = '';

//   const currentFavoriteRecipes = localStorage.getItem('favoriteRecipes')
//     ? JSON.parse(localStorage.getItem('favoriteRecipes'))
//     : [];

//   const favoriteRecipes = [
//     ...currentFavoriteRecipes,
//     { id, type, area, category, alcoholicOrNot, name, image },
//   ];
//   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
// }

const FoodInProgress = (props) => {
  const { loading, setLoading, foodDetails, setFoodDetails } = useContext(
    AppContext,
  );

  const { setIsFavorite } = useContext(AppContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loadFood = async () => {
      const { id } = props.match.params;
      const response = await getFoodById(id);
      await setFoodDetails(response.meals[0]);
      await setLoading(false);
      console.log(response.meals[0]);
    };

    const loadFavorite = () => {
      const { id } = props.match.params;
      const currentFavorite = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      setIsFavorite(currentFavorite.some((curr) => curr.id === id));
    };

    loadFood().then(() => {
      if (localStorage.getItem('favoriteRecipes')) loadFavorite();
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  let ingredientsAndMeasure = [];
  for (let index = 1; index <= 20; index += 1) {
    ingredientsAndMeasure = [
      ...ingredientsAndMeasure,
      {
        ingredient: foodDetails[`strIngredient${index}`],
        measure: foodDetails[`strMeasure${index}`],
      },
    ];
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={foodDetails.strMealThumb}
        alt={foodDetails.strMeal}
        width="200px"
      />
      <h1 data-testid="recipe-title">{foodDetails.strMeal}</h1>
      <Buttons recipe={foodDetails} />
      {/* <button
        type="button"
        onClick={() => {
          copyToClipboard(window.location.href);
          document.getElementById('copied').innerHTML = 'Link copiado!';
        }}
      >
        <img src={shareIcon} alt="icon" data-testid="share-btn" />
      </button>
      <div id="copied" /> */}
      {/* <button
        type="button"
        onClick={() => {
          favoriteToLocalStorage(foodDetails);
          setIsFavorite(!isFavorite);
        }}
      >
        <img
          src={!isFavorite ? whiteHeartIcon : blackHeartIcon}
          alt="icon"
          data-testid="favorite-btn"
        />
      </button> */}
      <h4 data-testid="recipe-category">{foodDetails.strCategory} </h4>
      <h2>Ingredients</h2>
      {ingredientsAndMeasure
        .filter(
          ({ ingredient }) =>
            ingredient !== null &&
            ingredient !== undefined &&
            ingredient !== '',
        )
        .map(({ ingredient, measure }, index) => (
          <div key={ingredient} data-testid={`${index}-ingredient-step`}>
            <input
              type="checkbox"
              key={ingredient}
              id={index}
              defaultChecked={false}
              onChange={() => Func(index, checked, setChecked)}
            />{' '}
            <label
              className={
                checked && checked.includes(index) ? 'checked' : 'notChecked'
              }
              htmlFor={index}
            >{`- ${ingredient} - ${measure}`}</label>
          </div>
        ))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{foodDetails.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

export default FoodInProgress;
