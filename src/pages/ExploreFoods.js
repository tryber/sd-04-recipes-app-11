import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const ExploreFoods = () => (
  <div>
    <Header title="Explorar Comidas" />
    <Link to="/explorar/comidas/ingredientes">
      <button data-testid="explore-by-ingredient">Por Ingredientes</button>
    </Link>
    <Link to="/explorar/comidas/area">
      <button data-testid="explore-by-area">Por Local de Origem</button>
    </Link>
    <Link to="">
      <button data-testid="explore-surprise">Me Surpreenda!</button>
    </Link>
    <Footer />
  </div>
);
export default ExploreFoods;
