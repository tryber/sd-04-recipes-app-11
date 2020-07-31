import React, { useEffect, useContext } from 'react';
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
        <input
          type="button"
          onClick={() => {
            setFilteredDrinks(drinks);
          }}
          data-testid="All-category-filter"
          value="All"
        />
        {drinksCategories.map(({ strCategory }, index) => {
          if (index < 5) return <CategoryCard key={strCategory} categoryName={strCategory} />;
          return null;
        })}
      </div>
      <DrinksCards filteredDrinks={filteredDrinks} />
    </div>
  );
};

export default Foods;
