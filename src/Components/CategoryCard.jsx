import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

function filterByCategory(foods, category) {
  return foods.filter(({ strCategory }) => strCategory === category);
}

export default function CategoryCard({ categoryName }) {
  const { foods, setFilteredFoods } = useContext(AppContext);

  return (
    <div>
      <input
        type="button"
        onClick={() => {
          console.log('array', foods);
          console.log('novo array', filterByCategory(foods, categoryName));
          setFilteredFoods(filterByCategory(foods, categoryName));
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
