import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

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
