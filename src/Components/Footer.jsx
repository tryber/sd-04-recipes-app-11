import React from 'react';
import { Link } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import ExplorerIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer" style={{ position: 'fixed', bottom: 0 }}>
    <div>
      <Link to="/bebidas">
        <img src={DrinkIcon} alt="bebida" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ExplorerIcon} alt="explorar" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={MealIcon} alt="comida" data-testid="food-bottom-btn" />
      </Link>
    </div>
  </footer>
);

export default Footer;
