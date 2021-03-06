import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';

function IngredientsCards({ ingredientsData }) {
  return (
    <div>
      {ingredientsData.map((ingredient, index) => {
        if (index < 12) {
          return (
            <div>
              <p data-testid={`${index}-ingredient-card`}>{ingredient.idIngredient}</p>
              <img
                src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                data-testid={`${index}-card-img`}
                alt={ingredient.strIngredient}
              />
              <p data-testid={`${index}-card-name`}> {ingredient.strIngredient} </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

IngredientsCards.propTypes = {
  ingredientsData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientsCards;
