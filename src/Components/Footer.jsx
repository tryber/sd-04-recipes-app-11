import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponents as DrinkIcon } from '../images/drinkIcon.svg';
import { ReactComponents as ExplorerIcon } from '../images/exploreIcon.svg';
import { ReactComponents as MealIcon } from '../images/mealIcon.svg';

const Footer = () => (
  <footer>
    <div>
      <Link to="/bebidas">
        <DrinkIcon />
      </Link>
      <Link to="/explorar">
        <ExplorerIcon />
      </Link>
      <Link to="/comidas">
        <MealIcon />
      </Link>
    </div>
  </footer>
);

export default Footer;
