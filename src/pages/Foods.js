import React, { useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import FoodCards from '../Components/FoodCards';
import getFoods from '../services/getFoods';
import getFoodsCategories from '../services/getFoodsCategories';
import FoodCategory from '../Components/FoodCategory';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

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
    setFilteredWith,
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
      <Header title="Comidas" searcheble />
      <div>
        <input
          type="button"
          onClick={() => {
            setFilteredFoods(foods);
            return setFilteredWith('All');
          }}
          data-testid="All-category-filter"
          value="All"
        />
        {foodsCategories.map(({ strCategory }, index) => {
          if (index < 5) return <FoodCategory key={strCategory} categoryName={strCategory} />;
          return null;
        })}
      </div>
      <FoodCards filteredFoods={filteredFoods} />
      <Footer />
    </div>
  );
};

export default Foods;
