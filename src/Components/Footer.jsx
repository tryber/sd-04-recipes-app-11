import React from 'react';
// import { drinkIcon, explorerIcon, mealIcon } from '../images';
import { ReactComponents as DrinkIcon } from '../images/drinkIcon.svg';
import { ReactComponents as ExplorerIcon } from '../images/exploreIcon.svg';
import { ReactComponents as MealIcon } from '../images/mealIcon.svg';

// import './Footer.css';

const Footer = () => (
  <footer>
    <div>
      {/* <img alt="drink" src={drinkIcon} className="icons" /> */}
      {/* <img alt="explore" src={explorerIcon} className="icons" /> */}
      {/* <img alt="meal" src={mealIcon} className="icon" /> */}
      <DrinkIcon />
      <ExplorerIcon />
      <MealIcon />
    </div>
  </footer>
);

export default Footer;
