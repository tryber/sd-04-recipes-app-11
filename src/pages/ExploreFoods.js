import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import randomRouteFood from '../services/randomRouteFood';

const ExploreFoods = () => {
  const history = useHistory();
  // randomItem recebe o resultado da API
  async function randomFood() {
    const randomItem = await randomRouteFood();
    history.push(`/comidas/${randomItem}`);
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient">Por Ingredientes</button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area">Por Local de Origem</button>
      </Link>

      <button data-testid="explore-surprise" onClick={() => randomFood()}>
        Me Surpreenda!
      </button>

      <Footer />
    </div>
  );
};

export default ExploreFoods;
