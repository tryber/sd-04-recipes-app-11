import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import getDrinksByCategory from '../services/getDrinksByCategory';

async function filterByCategory(category, setFilteredDrinks) {
  const response = await getDrinksByCategory(category);
  return setFilteredDrinks(response.drinks);
}

export default function CategoryCard({ categoryName }) {
  const {
    drinks,
    setFilteredDrinks,
    filteredWith,
    setFilteredWith,
  } = useContext(AppContext);

  return (
    <div>
      <input
        type="button"
        onClick={() => {
          if (filteredWith !== 'All' && filteredWith === categoryName) {
            setFilteredDrinks(drinks);
            return setFilteredWith('All');
          }
          filterByCategory(categoryName, setFilteredDrinks);
          return setFilteredWith(categoryName);
        }}
        data-testid={`${categoryName}-category-filter`}
        value={categoryName}
      />
    </div>
  );
}

CategoryCard.propTypes = {
  categoryName: PropTypes.string.isRequired,
};
