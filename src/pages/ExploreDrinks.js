import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import randomRouteDrink from '../services/randomRouteDrink';

const ExploreDrinks = () => {
  const history = useHistory();

  async function randomDrink() {
    const randomItem = await randomRouteDrink();
    history.push(`/bebidas/${randomItem}`);
  }

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <h1 data-testid="page-title">Explorar Bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient">Por Ingredientes</button>
      </Link>

      <button data-testid="explore-surprise" onClick={() => randomDrink()}>
        Me Surpreenda!
      </button>

      <Footer />
    </div>
  );
};

export default ExploreDrinks;
