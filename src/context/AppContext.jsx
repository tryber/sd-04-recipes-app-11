import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [foodsCategories, setFoodsCategories] = useState([]);

  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const context = {
    email,
    password,
    setEmail,
    setPassword,
    foods,
    setFoods,
    drinks,
    setDrinks,
    loading,
    setLoading,
    foodsCategories,
    setFoodsCategories,
    drinksCategories,
    setDrinksCategories,
    filteredFoods,
    setFilteredFoods,
    filteredDrinks,
    setFilteredDrinks,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
