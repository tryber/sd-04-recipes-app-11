import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Redirect } from 'react-router-dom';
import DrinksCards from '../Components/DrinksCards';
import getDrinks from '../services/getDrinks';
import getDrinksCategories from '../services/getDrinksCategories';
import DrinkCategory from '../Components/DrinkCategory';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const Drinks = () => {
  const {
    drinks,
    setDrinks,
    drinksCategories,
    setDrinksCategories,
    loading,
    setLoading,
    filteredDrinks,
    setFilteredDrinks,
    setFilteredWith,
  } = useContext(AppContext);

  useEffect(() => {
    getDrinksCategories().then((response) => {
      setDrinksCategories(response.drinks);
    });

    getDrinks().then((response) => {
      setDrinks(response.drinks);
      setFilteredDrinks(response.drinks);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (filteredDrinks.length === 1) return <Redirect to={`/bebidas/${filteredDrinks[0].idDrink}`} />;

  return (
    <div>
      <Header title="Bebidas" searchble />
      <div>
        <input
          type="button"
          onClick={() => {
            setFilteredDrinks(drinks);
            return setFilteredWith('All');
          }}
          data-testid="All-category-filter"
          value="All"
        />
        {drinksCategories.map(({ strCategory }, index) => {
          if (index < 5) {
            return <DrinkCategory key={strCategory} categoryName={strCategory} />;
          }
          return null;
        })}
      </div>
      {console.log('filteredDrinks', filteredDrinks)}
      <DrinksCards filteredDrinks={filteredDrinks} />
      <Footer />
    </div>
  );
};

export default Drinks;
