import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

function DrinkCard({ drink, index }) {
  const { strDrinkThumb, strDrink } = drink;
  return (
    <div data-testid={`${index}-recipe-card`}>
      <img data-testid={`${index}-card-img`} src={strDrinkThumb} />
      <p data-testid={`${index}-card-name`}>{strDrink}</p>
    </div>
  );
}

export default function FoodCards({ filteredDrinks }) {
  return (
    <div>
      {filteredDrinks.map((drink, index) =>
        index < 12 ? <DrinkCard drink={drink} key={index} index={index} /> : null,
      )}
    </div>
  );
}
