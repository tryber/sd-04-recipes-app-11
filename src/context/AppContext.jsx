import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [foodsCategories, setFoodsCategories] = useState([]);
  const [foodDetails, setFoodDetails] = useState({});

  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState({});

  const [loading, setLoading] = useState(true);
  const [filteredWith, setFilteredWith] = useState('All');

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
    filteredWith,
    setFilteredWith,
    foodDetails,
    setFoodDetails,
    drinkDetails,
    setDrinkDetails,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
