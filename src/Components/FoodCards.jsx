import React from 'react';
import PropTypes from 'prop-types';

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
        if (index < 12) return <FoodCard food={food} key={food.strMeal} index={index} />;
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
