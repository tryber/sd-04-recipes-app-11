import React, { useEffect, useContext } from 'react';
import getFoodById from '../services/getFoodById';
import getDrinks from '../services/getDrinks';
import { AppContext } from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function DrinkCard({ food, index }) {
  const { strDrinkThumb, strDrink } = food;
  return (
    <div data-testid={`${index}-recomendation-card`}>
      <img src={strDrinkThumb} alt={strDrink} />
      <p data-testid={`${index}-recomendation-title`}>{strDrink}</p>
    </div>
  );
}

const FoodDetails = (props) => {
  const { loading, setLoading, foodDetails, setFoodDetails, drinks, setDrinks } = useContext(
    AppContext,
  );

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

  return (
    <div>
      <img data-testid="recipe-photo" src={foodDetails.strMealThumb} alt={foodDetails.strMeal} />
      <h1 data-testid="recipe-title">{foodDetails.strMeal}</h1>
      <img src={shareIcon} alt="icon" data-testid="share-btn" />
      <img src={whiteHeartIcon} alt="icon" data-testid="favorite-btn" />
      <h4 data-testid="recipe-category">{foodDetails.strCategory} </h4>
      <h2>Ingredients</h2>
      {ingredientsAndMeasure
        .filter(({ ingredient }) => ingredient !== '')
        .map(({ ingredient, measure }, index) => {
          return (
            <div>
              <p data-testid={`${index}-ingredient-name-and-measure`}>
                {'- ' + ingredient + ' - ' + measure}
              </p>
            </div>
          );
        })}
      <h2>Instructions</h2>
      <p data-testid="instructions">{foodDetails.strInstructions}</p>
      <h2>Video</h2>
      <ReactPlayer data-testid="video" url={foodDetails.strYoutube} />
      <h2>Recomendadas</h2>
      <div style={{ display: 'flex' }}>
        {drinks.map((food, index) => {
          console.log(food);
          if (index < 2) {
            return (
              <Link to={`/bebidas/${food.idDrink}`}>
                <DrinkCard food={food} key={food.strDrink} index={index} />
              </Link>
            );
          }
        })}
      </div>
      <Link to={`/comidas/${foodDetails.idMeal}/in-progress`}>
        <input type="button" data-testid="start-recipe-btn" value="Iniciar Receita" />
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
