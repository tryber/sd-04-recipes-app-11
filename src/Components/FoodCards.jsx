import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodCard({ food, index }) {
  const { strMealThumb, strMeal } = food;
  return (
    <div data-testid={`${index}-recipe-card`}>
      <img data-testid={`${index}-card-img`} src={strMealThumb} alt={strMeal} />
      <p data-testid={`${index}-card-name`}>{strMeal}</p>
    </div>
  );
}

export default function FoodCards({ filteredFoods }) {
  return (
    <div>
      {filteredFoods.map((food, index) => {
        if (index < 12) {
          return (
            <Link to={`/comidas/${food.idMeal}`}>
              <FoodCard food={food} key={food.strMeal} index={index} />
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
}

FoodCards.propTypes = {
  filteredFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FoodCard.propTypes = {
  food: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
