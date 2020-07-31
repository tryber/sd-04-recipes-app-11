import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PropTypes from 'prop-types';

function filterByCategory(foods, category) {
  return foods.filter(({ strCategory }) => strCategory === category);
}

export default function CategoryCard({ categoryName }) {
  const { foods, setFilteredFoods } = useContext(AppContext);

  return (
    <div>
      <button
        onClick={() => {
          console.log('array', foods);
          console.log('novo array', filterByCategory(foods, categoryName));
          setFilteredFoods(filterByCategory(foods, categoryName));
        }}
        data-testid={`${categoryName}-category-filter`}
      >
        {categoryName}
      </button>
    </div>
  );
}

CategoryCard.propTypes = {
  categoryName: PropTypes.string.isRequired,
};
