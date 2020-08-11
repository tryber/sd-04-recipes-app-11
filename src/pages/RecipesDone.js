import React from 'react';
import Header from '../Components/Header';

const navButtons = () => (
  <div>
    <button type="button" data-testid="filter-by-all-btn">
      All
    </button>
    <button type="button" data-testid="filter-by-food-btn">
      Food
    </button>
    <button type="button" data-testid="filter-by-drink-btn">
      Drinks
    </button>
  </div>
);

const RecipesDone = () => {
  return (
    <div>
      <Header title="Receitas Feitas" />
      {navButtons()}
    </div>
  );
};

export default RecipesDone;
