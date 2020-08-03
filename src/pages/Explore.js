import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Explore = () => (
  <div>
            <Header haveSearch noIcon />

      <h1 data-testid="page-title">Explorar</h1>
    <Link to="/explorar/comidas">
      <button data-testid="explore-food">Explorar Comidas</button>
    </Link>
    <Link to="/explorar/bebidas">
      <button data-testid="explore-drinks">Explorar Bebidas</button>
    </Link>
    <Footer />
  </div>
);

export default Explore;
