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

export function FoodCard({ food, index }) {
  const { strMealThumb, strMeal } = food;
  return (
    <div data-testid={`${index}-recomendation-card`}>
      <img src={strMealThumb} alt={strMeal} />
      <p data-testid={`${index}-recomendation-title`}>{strMeal}</p>
    </div>
  );
}

// const copyToClipboard = () => {
//   const el = document.createElement('textarea');
//   el.value = window.location.href;
//   document.body.appendChild(el);
//   el.select();
//   document.execCommand('copy');
//   document.body.removeChild(el);
// };

const DrinkDetails = (props) => {
  const { loading, setLoading, drinkDetails, setDrinkDetails, foods, setFoods } = useContext(
    AppContext,
  );

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadRecommended = async () => {
      await setLoading(true);
      const response = await getFoods();
      setFoods(response.meals);
    };

    const loadDrink = async () => {
      const { id } = props.match.params;
      const response = await getDrinkById(id);
      console.log(response);
      await setDrinkDetails(response.drinks[0]);
      await setLoading(false);
    };

    loadRecommended().then(() => {
      loadDrink();
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
      <img
        src={shareIcon}
        alt="icon"
        data-testid="share-btn"
        onClick={() => {
          copyToClipboard(window.location.href);
          document.getElementById('copied').innerHTML = 'Link copiado!';
          // setTimeout(() => document.getElementById('copied').innerHTML = '', 5000)
        }}
      />
      <div id="copied"></div>
      <button type="button" onClick={() => setIsFavorite(!isFavorite)}>
      <img
        src={isFavorite ? blackHeartIcon : whiteHeartIcon}
        alt="icon"
        data-testid="favorite-btn"
      />
      </button>
      <h4 data-testid="recipe-category">
        {`${drinkDetails.strCategory} ${drinkDetails.strAlcoholic} `}{' '}
      </h4>
      <h2>Ingredients</h2>
      {ingredientsAndMeasure
        .filter(({ ingredient }) => ingredient !== '')
        .map(({ ingredient, measure }, index) => {
          return (
            <div>
              <p data-testid={`${index}-ingredient-name-and-measure`}>
                {`- ${ingredient} - ${measure}`}
              </p>
            </div>
          );
        })}
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
            console.log('food', index, food);
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
          value="Iniciar Receita"
          style={{ position: 'fixed', bottom: '0' }}
        />
      </Link>
      <input
        type="button"
        data-testid="continue-recipe-btn"
        value="Continuar Receita"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default DrinkDetails;

FoodCard.propTypes = {
  food: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
