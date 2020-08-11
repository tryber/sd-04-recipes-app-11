import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import copyToClipboard from 'clipboard-copy';
import getDrinkById from '../services/getDrinkById';
import getFoods from '../services/getFoods';
import { AppContext } from '../context/AppContext';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import Buttons from '../Components/Buttons';

export function FoodCard({ food, index }) {
  const { strMealThumb, strMeal } = food;
  return (
    <div data-testid={`${index}-recomendation-card`}>
      <img src={strMealThumb} alt={strMeal} />
      <p data-testid={`${index}-recomendation-title`}>{strMeal}</p>
    </div>
  );
}

// function favoriteToLocalStorage(recipe) {
//   const {
//     idDrink: id,
//     strCategory: category,
//     strAlcoholic: alcoholicOrNot,
//     strDrink: name,
//     strDrinkThumb: image,
//   } = recipe;
//   const type = 'bebida';
//   const area = '';

//   const currentFavoriteRecipes = localStorage.getItem('favoriteRecipes')
//     ? JSON.parse(localStorage.getItem('favoriteRecipes'))
//     : [];

//   const favoriteRecipes = [
//     ...currentFavoriteRecipes,
//     { id, type, area, category, alcoholicOrNot, name, image },
//   ];
//   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
// }

const DrinkDetails = (props) => {
  const {
    loading,
    setLoading,
    drinkDetails,
    setDrinkDetails,
    foods,
    setFoods,
  } = useContext(AppContext);

  console.log(drinkDetails);

  const { setIsFavorite } = useContext(AppContext);
  const [isStarted, setIsStarted] = useState(false);

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

  const firstSix = foods.slice(0, 6);
  // const toRight = (array) => {
  //   firstSix.push(firstSix.shift());
  // }
  // const toLeft = (array) => {
  //   firstSix.push(firstSix.shift());
  // }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={drinkDetails.strDrinkThumb}
        alt={drinkDetails.strDrink}
      />
      <h1 data-testid="recipe-title">{drinkDetails.strDrink}</h1>
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
      <Buttons />
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
      <h4 data-testid="recipe-category">
        {`${drinkDetails.strCategory} ${drinkDetails.strAlcoholic} `}{' '}
      </h4>
      <h2>Ingredients</h2>
      {ingredientsAndMeasure
        .filter(({ ingredient }) => ingredient !== '')
        .map(({ ingredient, measure }, index) => (
          <div>
            <p data-testid={`${index}-ingredient-name-and-measure`}>
              {`- ${ingredient} - ${measure}`}
            </p>
          </div>
        ))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      {/* <h2>Video</h2>
      <ReactPlayer data-testid="video" url={drinkDetails.strYoutube} /> */}
      <h2>Recomendadas</h2>
      <input type="button" value="right ->" />
      <input type="button" value="<- left" />
      <div style={{ display: 'flex' }}>
        {firstSix.map((food, index) => {
          if (index < 2) {
            return (
              <Link to={`/comidas/${food.idMeal}`}>
                <div>
                  <FoodCard food={food} key={food.strMeal} index={index} />
                </div>
              </Link>
            );
          }
          return (
            <Link to={`/comidas/${food.idMeal}`}>
              <div style={{ display: 'none' }}>
                <FoodCard food={food} key={food.strMeal} index={index} />
              </div>
            </Link>
          );
        })}
      </div>

      <Link to={`/bebidas/${drinkDetails.idDrink}/in-progress`}>
        <input
          type="button"
          data-testid="start-recipe-btn"
          value={isStarted ? 'Continuar Receita' : 'Iniciar Receita'}
          style={{ position: 'fixed', bottom: '0' }}
          onClick={() => setIsStarted(true)}
        />
      </Link>
    </div>
  );
};

export default DrinkDetails;

FoodCard.propTypes = {
  food: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
