import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DrinksCards from '../Components/DrinksCards';
import getDrinks from '../services/getDrinks';
import getDrinksCategories from '../services/getDrinksCategories';
import CategoryCard from '../Components/CategoryCard';

const Foods = () => {
  const {
    drinks,
    setDrinks,
    drinksCategories,
    setDrinksCategories,
    loading,
    setLoading,
    filteredDrinks,
    setFilteredDrinks,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setFilteredDrinks(drinks);
          }}
          data-testid={'All-category-filter'}
        >
          All
        </button>
        {drinksCategories.map(({ strCategory }, index) =>
          index < 5 ? <CategoryCard key={strCategory} categoryName={strCategory} /> : null,
        )}
      </div>
      <DrinksCards filteredDrinks={filteredDrinks} />
    </div>
  );
};

export default Foods;
