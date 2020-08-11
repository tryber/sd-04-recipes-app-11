import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const FoodsByOrigin = () => {
  return (
    <div>
      <Header title="Explorar Origem" searchble />
      <select data-testid="explore-by-area-dropdown">
        <option data-testid="American-option">
          All
        </option>
      </select>

      <Footer />
    </div>
  );
};

export default FoodsByOrigin;
