import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import FoodCards from '../Components/FoodCards';
import getFoods from '../services/getFoods';
import getFoodsCategories from '../services/getFoodsCategories';
import CategoryCard from '../Components/CategoryCard';

const Foods = () => {
  const {
    foods,
    setFoods,
    foodsCategories,
    setFoodsCategories,
    loading,
    setLoading,
    filteredFoods,
    setFilteredFoods,
  } = useContext(AppContext);

  useEffect(() => {
    getFoodsCategories().then((response) => {
      setFoodsCategories(response.meals);
    });

    getFoods().then((response) => {
      setFoods(response.meals);
      setFilteredFoods(response.meals);
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
            setFilteredFoods(foods);
          }}
          data-testid={'All-category-filter'}
        >
          All
        </button>
        {foodsCategories.map(({ strCategory }, index) =>
          index < 5 ? <CategoryCard key={strCategory} categoryName={strCategory} /> : null,
        )}
      </div>
      <FoodCards filteredFoods={filteredFoods} />
    </div>
  );
};

export default Foods;
