import React, { useEffect, useContext } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import fetchByIngredients from '../services/fetchByIngredients';
import { AppContext } from '../context/AppContext';
import IngredientsCards from '../Components/IngredientsCards.jsx';

const FoodIngredients = () => {
  const { ingredients, setIngredients } = useContext(AppContext);

  const getIngredients = async () => {
    const ingredientsList = await fetchByIngredients();
    // setIngredients(ingredientsList);
    setIngredients(ingredientsList.meals);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <IngredientsCards ingredientsData={ingredients} />
      <Footer />
    </div>
  );
};

export default FoodIngredients;
