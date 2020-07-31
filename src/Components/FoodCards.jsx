import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import PropTypes from 'prop-types';

function FoodCard({ food, index }) {
  const { strMealThumb, strMeal } = food;
  return (
    <div data-testid={`${index}-recipe-card`}>
      <img data-testid={`${index}-card-img`} src={strMealThumb} />
      <p data-testid={`${index}-card-name`}>{strMeal}</p>
    </div>
  );
}

export default function FoodCards({ filteredFoods }) {
  return (
    <div>
      {filteredFoods.map((food, index) =>
        index < 12 ? <FoodCard food={food} key={index} index={index} /> : null,
      )}
    </div>
  );
}

FoodCards.propTypes = {
  filteredFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
};
