import React from 'react';
import PropTypes from 'prop-types';

function DrinkCard({ drink, index }) {
  const { strDrinkThumb, strDrink } = drink;
  return (
    <div data-testid={`${index}-recipe-card`}>
      <img data-testid={`${index}-card-img`} src={strDrinkThumb} />
      <p data-testid={`${index}-card-name`}>{strDrink}</p>
    </div>
  );
}

export default function DrinksCards({ filteredDrinks }) {
  return (
    <div>
      {filteredDrinks.map((drink, index) =>
        index < 12 ? <DrinkCard drink={drink} key={index} index={index} /> : null,
      )}
    </div>
  );
}

DrinksCards.propTypes = {
  filteredDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
}