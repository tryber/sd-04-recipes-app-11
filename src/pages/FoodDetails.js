import React, { useEffect, useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';
import getFoodById from '../services/getFoodById';
import getDrinks from '../services/getDrinks';
import { AppContext } from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export function DrinkCard({ drink, index }) {
  const { strDrinkThumb, strDrink } = drink;
  return (
    <div data-testid={`${index}-recomendation-card`}>
      <img src={strDrinkThumb} alt={strDrink} />
      <p data-testid={`${index}-recomendation-title`}>{strDrink}</p>
    </div>
  );
}

// async function copyToClipboard() {
//   var input = document.body.appendChild(document.createElement('input'));
//   input.value = window.location.href;
//   input.focus();
//   input.select();
//   document.execCommand('copy');
//   input.parentNode.removeChild(input);
// }

const FoodDetails = (props) => {
  const { loading, setLoading, foodDetails, setFoodDetails, drinks, setDrinks } = useContext(
    AppContext,
  );

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadRecommended = async () => {
      await setLoading(true);
      const response = await getDrinks();
      setDrinks(response.drinks);
    };

    const loadFood = async () => {
      const { id } = props.match.params;
      const response = await getFoodById(id);
      await setFoodDetails(response.meals[0]);
      await setLoading(false);
    };

    loadRecommended().then(() => {
      loadFood();
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

  const firstSix = drinks.slice(0, 6);
  // const toRight = (array) => {
  //   firstSix.push(firstSix.shift());
  // }
  // const toLeft = (array) => {
  //   firstSix.push(firstSix.shift());
  // }

  return (
    <div>
      <img data-testid="recipe-photo" src={foodDetails.strMealThumb} alt={foodDetails.strMeal} />
      <h1 data-testid="recipe-title">{foodDetails.strMeal}</h1>
      <img
        src={shareIcon}
        alt="icon"
        data-testid="share-btn"
        onClick={() => {
          copyToClipboard(window.location.href);
          document.getElementById('copied').innerHTML = 'Link copiado!';
          // setTimeout(() => (document.getElementById('copied').innerHTML = ''), 5000);
        }}
      />
      <div id="copied"></div>
      <button type="button" onClick={() => setIsFavorite(!isFavorite)}>
        <img
          src={!isFavorite ? whiteHeartIcon : blackHeartIcon}
          alt="icon"
          data-testid="favorite-btn"
        />
      </button>
      <h4 data-testid="recipe-category">{foodDetails.strCategory} </h4>
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
      <p data-testid="instructions">{foodDetails.strInstructions}</p>
      <h2>Video</h2>
      <ReactPlayer data-testid="video" url={foodDetails.strYoutube} />
      <h2>Recomendadas</h2>
      <input type="button" value="right ->" />
      <input type="button" value="<- left" />
      <div style={{ display: 'flex' }}>
        {firstSix.map((drink, index) => {
          if (index < 2) {
            return (
              <Link to={`/bebidas/${drink.idDrink}`}>
                <div>
                  <DrinkCard drink={drink} key={drink.strDrink} index={index} />
                </div>
              </Link>
            );
          }
          return (
            <Link to={`/bebidas/${drink.idDrink}`}>
              <div style={{ display: 'none' }}>
                <DrinkCard drink={drink} key={drink.strDrink} index={index} />
              </div>
            </Link>
          );
        })}
      </div>

      <Link to={`/comidas/${foodDetails.idMeal}/in-progress`}>
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

export default FoodDetails;

DrinkCard.propTypes = {
  drink: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
