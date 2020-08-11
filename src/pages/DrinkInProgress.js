import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';
import getDrinkById from '../services/getDrinkById';
import getFoods from '../services/getFoods';
import { AppContext } from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './InProgress.css';
import Buttons from '../Components/Buttons';
import Func from '../Components/Func';


export function FoodCard({ food, index }) {
  const { strMealThumb, strMeal } = food;
  return (
    <div data-testid={`${index}-recomendation-card`}>
      <img src={strMealThumb} alt={strMeal} />
      <p data-testid={`${index}-recomendation-title`}>{strMeal}</p>
    </div>
  );
}

function favoriteToLocalStorage(recipe) {
  const {
    idDrink: id,
    strCategory: category,
    strAlcoholic: alcoholicOrNot,
    strDrink: name,
    strDrinkThumb: image,
  } = recipe;
  const type = 'bebida';
  const area = '';

  const currentFavoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

  const favoriteRecipes = [
    ...currentFavoriteRecipes,
    { id, type, area, category, alcoholicOrNot, name, image },
  ];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

const DrinkInProgress = (props) => {
  const {
    loading,
    setLoading,
    drinkDetails,
    setDrinkDetails,
    setFoods,
  } = useContext(AppContext);

  console.log(drinkDetails);

  const {isFavorite, setIsFavorite} = useContext(AppContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loadRecommended = async () => {
      await setLoading(true);
      const response = await getFoods();
      setFoods(response.meals);
    };

    const loadDrink = async () => {
      const { id } = props.match.params;
      const response = await getDrinkById(id);
      await setDrinkDetails(response.drinks[0]);
      await setLoading(false);
    };

    const loadFavorite = () => {
      const { id } = props.match.params;
      const currentFavorite = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      setIsFavorite(currentFavorite.some((curr) => curr.id === id));
    };

    loadRecommended().then(() => {
      loadDrink();
      if (localStorage.getItem('favoriteRecipes')) loadFavorite();
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  let ingredientsAndMeasure = [];
  for (let index = 1; index <= 20; index += 1) {
    ingredientsAndMeasure = [
      ...ingredientsAndMeasure,
      {
        ingredient: drinkDetails[`strIngredient${index}`],
        measure: drinkDetails[`strMeasure${index}`],
      },
    ];
  }

  // const firstSix = foods.slice(0, 6);
  // const toRight = (array) => {
  //   firstSix.push(firstSix.shift());
  // }
  // const toLeft = (array) => {
  //   firstSix.push(firstSix.shift());
  // }

  return (
    <div>
      {console.log(ingredientsAndMeasure)}
      <img
        data-testid="recipe-photo"
        src={drinkDetails.strDrinkThumb}
        alt={drinkDetails.strDrink}
        width="200px"
      />
      <h1 data-testid="recipe-title">{drinkDetails.strDrink}</h1>
      <Buttons recipe={drinkDetails} />
      {/* <button
        type="button"
        onClick={() => {
          copyToClipboard(window.location.href);
          document.getElementById('copied').innerHTML = 'Link copiado!';
          // setTimeout(() => document.getElementById('copied').innerHTML = '', 5000)
        }}
      >
        <img src={shareIcon} alt="icon" data-testid="share-btn" />
      </button>
      <div id="copied" /> */}
      {/* <button
        type="button"
        onClick={() => {
          favoriteToLocalStorage(drinkDetails);
          setIsFavorite(!isFavorite);
        }}
      >
        <img
          src={isFavorite ? blackHeartIcon : whiteHeartIcon}
          alt="icon"
          data-testid="favorite-btn"
        />
      </button> */}
      <h4 data-testid="recipe-category">{drinkDetails.strAlcoholic}</h4>
      <h2>Ingredients</h2>
      {ingredientsAndMeasure
        .filter(
          ({ ingredient }) =>
            ingredient !== null && ingredient !== undefined && ingredient !== '',
        )
        .map(({ ingredient, measure }, index) => (
          <div data-testid={`${index}-ingredient-step`} key={ingredient}>
            <input
              type="checkbox"
              key={ingredient}
              id={ingredient}
              defaultChecked={false}
              onChange={() => Func(index, checked, setChecked)}
            />
            <label
              className={
                checked && checked.includes(index) ? 'checked' : 'notChecked'
              }
              htmlFor={ingredient}
            >{`- ${ingredient} - ${measure}`}</label>
          </div>
        ))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>

      <Link to="/receitas-feitas">
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

export default DrinkInProgress;

FoodCard.propTypes = {
  food: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
