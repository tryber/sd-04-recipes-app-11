import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const ExploreDrinks = () => {
  return (
    <div>
      <Header haveSearch noIcon />
          <h1 data-testid="page-title">Explorar Bebidas</h1>

        <Footer />

    </div>
  );
};

export default ExploreDrinks;
