import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function removeFromLocalStorage(recipeId) {
  const currentFavoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

  const updatedFavoriteRecipes = currentFavoriteRecipes.filter(({ id }) => id !== recipeId);
  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
}

function FoodCard({ recipe, index }) {
  const { id, area, category, name, image } = recipe;

  return (
    <div data-testid={`${index}-recipe-card`}>
      <Link to={`/comidas/${recipe.id}`}>
        <img
          data-testid={`${index}-horizontal-image`}
          src={image}
          alt={`${name} - ${category}`}
          style={{ width: '100%' }}
        />
        <p data-testid={`${index}-horizontal-top-text`}>{`${area} - ${category}`}</p>
        <p data-testid={`${index}-horizontal-name`}>{name}</p>
      </Link>

      <input
        type="image"
        data-testid={`${index}-horizontal-share-btn`}
        src={shareIcon}
        alt="icon"
        onClick={() => {
          copyToClipboard(`http://localhost:3000/comidas/${id}`);
          document.getElementById('copied').innerHTML = 'Link copiado!';
        }}
      />
      <div id="copied" />
      <input
        type="image"
        data-testid={`${index}-horizontal-favorite-btn`}
        onClick={() => {
          removeFromLocalStorage(id);
        }}
        src={blackHeartIcon}
        alt="iconblack"
      />
    </div>
  );
}

function DrinkCard({ recipe, index }) {
  const { id, alcoholicOrNot, name, image } = recipe;

  return (
    <div data-testid={`${index}-recipe-card`}>
      <Link to={`/bebidas/${id}`}>
        <img
          data-testid={`${index}-horizontal-image`}
          src={image}
          alt={name}
          style={{ width: '100%' }}
        />
        <p data-testid={`${index}-horizontal-top-text`}>{alcoholicOrNot}</p>
        <p data-testid={`${index}-horizontal-name`}>{name}</p>
      </Link>
      <input
        type="image"
        data-testid={`${index}-horizontal-share-btn`}
        src={shareIcon}
        alt="icon"
        onClick={() => {
          copyToClipboard(`http://localhost:3000/bebidas/${id}`);
          document.getElementById('copied').innerHTML = 'Link copiado!';
        }}
      />
      <div id="copied" />
      <input
        type="image"
        data-testid={`${index}-horizontal-favorite-btn`}
        onClick={() => {
          removeFromLocalStorage(id);
        }}
        src={blackHeartIcon}
        alt="icon"
      />
    </div>
  );
}

const FavoriteRecipes = () => {
  const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoritesStorage);
  }, []);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <input
        type="button"
        data-testid="filter-by-all-btn"
        onClick={() => setFavorites(favoritesStorage)}
        value="All"
      />
      <input
        type="button"
        data-testid="filter-by-food-btn"
        onClick={() => setFavorites(favoritesStorage.filter((recipe) => recipe.type === 'comida'))}
        value="Comidas"
      />
      <input
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={() => setFavorites(favoritesStorage.filter((recipe) => recipe.type === 'bebida'))}
        value="Bebidas"
      />
      {favorites.map((recipe, index) => {
        if (recipe.type === 'comida') return <FoodCard recipe={recipe} index={index} />;

        return <DrinkCard recipe={recipe} index={index} />;
      })}
    </div>
  );
};

export default FavoriteRecipes;

FoodCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

DrinkCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
