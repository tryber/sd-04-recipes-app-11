import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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
  const [fLetter, setFletter] = useState('');
  const [filteredByIngredients, setFilteredByIngredients] = useState('');

  const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorites, setFavorites] = useState(favoritesStorage || []);
  const [ingredients, setIngredients] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);

  const context = {
    email,
    password,
    title,
    showSearch,
    setEmail,
    setPassword,
    setTitle,
    setShowSearch,
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
    fLetter,
    setFletter,
    filteredByIngredients,
    setFilteredByIngredients,
    favorites,
    setFavorites,
    ingredients,
    setIngredients,
    isFavorite,
    setIsFavorite,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
