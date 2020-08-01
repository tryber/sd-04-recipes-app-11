import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard({ drink, index }) {
  const { strDrinkThumb, strDrink } = drink;
  return (
    <div data-testid={`${index}-recipe-card`}>
      <img data-testid={`${index}-card-img`} src={strDrinkThumb} alt={strDrink} />
      <p data-testid={`${index}-card-name`}>{strDrink}</p>
    </div>
  );
}

export default function DrinksCards({ filteredDrinks }) {
  return (
    <div>
      {filteredDrinks.map((drink, index) => {
        if (index < 12) {
          return (
            <Link to={`/bebidas/${drink.idDrink}`}>
              <DrinkCard drink={drink} key={drink.strDrink} index={index} />
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
}

DrinksCards.propTypes = {
  filteredDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

DrinkCard.propTypes = {
  drink: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
