import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const ExploreDrinks = () => (
  <div>
    <Header title="Explorar Bebidas" />
    <h1 data-testid="page-title">Explorar Bebidas</h1>
    <Link to="/explorar/bebidas/ingredientes">
      <button data-testid="explore-by-ingredient">Por Ingredientes</button>
    </Link>
    <Link to="">
      <button data-testid="explore-surprise">Me Surpreenda!</button>
    </Link>
    <Footer />
  </div>
);

export default ExploreDrinks;
