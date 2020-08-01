import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import getFoodsByCategory from '../services/getFoodsByCategory';

async function filterByCategory(category, setFilteredFoods) {
  const response = await getFoodsByCategory(category);
  return setFilteredFoods(response.meals);
}

export default function CategoryCard({ categoryName }) {
  const {
    foods,
    setFilteredFoods,
    filteredWith,
    setFilteredWith,
  } = useContext(AppContext);

  return (
    <div>
      <input
        type="button"
        onClick={() => {
          if (filteredWith !== 'All' && filteredWith === categoryName) {
            setFilteredFoods(foods);
            return setFilteredWith('All');
          }
          filterByCategory(categoryName, setFilteredFoods);
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
