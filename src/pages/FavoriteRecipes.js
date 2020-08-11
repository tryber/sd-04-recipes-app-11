import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';
import { AppContext } from '../context/AppContext';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function removeFromLocalStorage(recipeId, setFavorites) {
  const currentFavoriteRecipes = JSON.parse(
    localStorage.getItem('favoriteRecipes')
  );
  console.log(currentFavoriteRecipes);
  const updatedFavoriteRecipes = currentFavoriteRecipes.filter(
    ({ id }) => id !== recipeId
  );
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify(updatedFavoriteRecipes)
  );
  setFavorites(updatedFavoriteRecipes);
}

function FoodCard({ recipe, index }) {
  const { id, area, category, name, image } = recipe;
  const { setFavorites } = useContext(AppContext);

  return (
    <div data-testid={`${index}-recipe-card`}>
      <Link to={`/comidas/${recipe.id}`}>
        <img
          data-testid={`${index}-horizontal-image`}
          src={image}
          alt={`${name} - ${category}`}
          style={{ width: '100%' }}
        />
        <p
          data-testid={`${index}-horizontal-top-text`}
        >{`${area} - ${category}`}</p>
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
          removeFromLocalStorage(id, setFavorites);
        }}
        src={blackHeartIcon}
        alt="iconblack"
      />
    </div>
  );
}

function DrinkCard({ recipe, index }) {
  const { id, alcoholicOrNot, name, image } = recipe;
  const { setFavorites } = useContext(AppContext);

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
          removeFromLocalStorage(id, setFavorites);
        }}
        src={blackHeartIcon}
        alt="icon"
      />
    </div>
  );
}

const FavoriteRecipes = () => {
  const { favorites, setFavorites } = useContext(AppContext);
  const currentFavoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

  console.log(favorites);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <input
        type="button"
        data-testid="filter-by-all-btn"
        onClick={() => setFavorites(currentFavoriteRecipes)}
        value="All"
      />
      <input
        type="button"
        data-testid="filter-by-food-btn"
        onClick={() =>
          setFavorites(
            currentFavoriteRecipes.filter((recipe) => recipe.type === 'comida')
          )
        }
        value="Comidas"
      />
      <input
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={() =>
          setFavorites(
            currentFavoriteRecipes.filter((recipe) => recipe.type === 'bebida')
          )
        }
        value="Bebidas"
      />
      {favorites.map((recipe, index) => {
        if (recipe.type === 'comida')
          return <FoodCard recipe={recipe} index={index} />;

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
