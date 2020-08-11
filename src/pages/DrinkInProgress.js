// import React, { useState, useContext, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import getDrinkById from '../services/getDrinkById';
// // import DrinkDetails from './DrinkDetails';

// export default function DrinkInProgress() {
//   const [drink, setDrink] = useState({});
//   const [ingredients, setIngredients] = useState([]);
//   const [inputs, setInputs] = useState([]);
//   const { id } = useParams();
//   // const { addIngredient } = DrinkDetails(drink);
//   const { drinkDetails, setDrinkDetails, foods, setFoods } = useContext(
//       AppContext,
//     );

//   const ArrayIngredients = () => {
//     let ingredientsAndMeasure = [];
//     for (let index = 1; index <= 20; index += 1) {
//       ingredientsAndMeasure = [
//         ...ingredientsAndMeasure,
//         {
//           ingredient: drinkDetails[`strIngredient${index}`],
//           measure: drinkDetails[`strMeasure${index}`],
//         },
//       ];
//     }
//   };

//   useEffect(() => {
//     getDrinkById(id).then(({ drink: { drinks } }) => {
//       setDrink(drinks[0]);
//       setIngredients(ArrayIngredients(drinks[0]));
//     });
//   }, [id]);

//   // useEffect(() => {
//   //   addIngredient('cocktails', id, inputs);
//   // }, [inputs]);

//   function handleInput(event) {
//     if (inputs.includes(event)) {
//       setInputs(inputs.filter((input) => input !== event));
//     } else {
//       setInputs([...inputs, event]);
//     }
//   }
//   return (
//     <div>
//       <img data-testid="recipe-photo" src={drink.strDrinkThumb} alt="foto" />
//       <div>
//         <h3 data-testid="recipe-title">{drink.strDrink}</h3>
//         <h5 data-testid="recipe-category">
//           {drink.strCategory}
//         </h5>
//       </div>
//       <div>
//         <img data-testid="share-btn" src={shareIcon} alt="share" />
//         <img data-testid="favorite-btn" src={whiteHeartIcon} alt="share" />
//       </div>
//       <div>
//         <h4>Ingredients</h4>
//         <div>
//           {ingredients.map((ingredient, index) => (
//             <div key={ingredient}>
//               <input
//                 data-testid={`${index}-ingredient-step`}
//                 type="checkbox"
//                 value={ingredient}
//                 onClick={(e) => handleInput(e.target.value)}
//               />
//               <label htmlFor={ingredient} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <h4>Instructions</h4>
//         <p data-testid="instructions">
//           {drink.strInstructions}
//         </p>
//       </div>
//       <div>
//         <button
//           type="button"
//           data-testid="finish-recipe-btn"
//         >
//           Finalizar Receita
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copyToClipboard from 'clipboard-copy';
import getDrinkById from '../services/getDrinkById';
import getFoods from '../services/getFoods';
import { AppContext } from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './InProgress.css';

export function FoodCard({ food, index }) {
  const { strMealThumb, strMeal } = food;
  return (
    <div data-testid={`${index}-recomendation-card`}>
      <img src={strMealThumb} alt={strMeal} />
      <p data-testid={`${index}-recomendation-title`}>{strMeal}</p>
    </div>
  );
}

function favoriteToLocalStorage(recipe) {
  const {
    idDrink: id,
    strCategory: category,
    strAlcoholic: alcoholicOrNot,
    strDrink: name,
    strDrinkThumb: image,
  } = recipe;
  const type = 'bebida';
  const area = '';

  const currentFavoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

  const favoriteRecipes = [
    ...currentFavoriteRecipes,
    { id, type, area, category, alcoholicOrNot, name, image },
  ];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

const DrinkDetails = (props) => {
  const {
    loading,
    setLoading,
    drinkDetails,
    setDrinkDetails,
    setFoods,
  } = useContext(AppContext);

  console.log(drinkDetails);

  const [isFavorite, setIsFavorite] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = (index, checked, setChecked) => {
    if (!checked) return setChecked([index]);

    if (checked.includes(index)) {
      setChecked((prev) => [
        ...prev.slice(0, prev.indexOf(index)),
        ...prev.slice(prev.indexOf(index) + 1),
      ]);
    }
    return setChecked((prevDones) => {
      return [...prevDones, index];
    });
  };

  useEffect(() => {
    const loadRecommended = async () => {
      await setLoading(true);
      const response = await getFoods();
      setFoods(response.meals);
    };

    const loadDrink = async () => {
      const { id } = props.match.params;
      const response = await getDrinkById(id);
      await setDrinkDetails(response.drinks[0]);
      await setLoading(false);
    };

    const loadFavorite = () => {
      const { id } = props.match.params;
      const currentFavorite = JSON.parse(
        localStorage.getItem('favoriteRecipes')
      );
      setIsFavorite(currentFavorite.some((curr) => curr.id === id));
    };

    loadRecommended().then(() => {
      loadDrink();
      if (localStorage.getItem('favoriteRecipes')) loadFavorite();
    });

    const data = localStorage.getItem('inProgressRecipes');
    if (data) {
      setChecked(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checked));
  });

  if (loading) return <div>Loading...</div>;
  let ingredientsAndMeasure = [];
  for (let index = 1; index <= 20; index += 1) {
    ingredientsAndMeasure = [
      ...ingredientsAndMeasure,
      {
        ingredient: drinkDetails[`strIngredient${index}`],
        measure: drinkDetails[`strMeasure${index}`],
      },
    ];
  }

  // const firstSix = foods.slice(0, 6);
  // const toRight = (array) => {
  //   firstSix.push(firstSix.shift());
  // }
  // const toLeft = (array) => {
  //   firstSix.push(firstSix.shift());
  // }

  return (
    <div>
      {console.log(ingredientsAndMeasure)}
      <img
        data-testid="recipe-photo"
        src={drinkDetails.strDrinkThumb}
        alt={drinkDetails.strDrink}
      />
      <h1 data-testid="recipe-title">{drinkDetails.strDrink}</h1>
      <button
        type="button"
        onClick={() => {
          copyToClipboard(window.location.href);
          document.getElementById('copied').innerHTML = 'Link copiado!';
          // setTimeout(() => document.getElementById('copied').innerHTML = '', 5000)
        }}
      >
        <img src={shareIcon} alt="icon" data-testid="share-btn" />
      </button>
      <div id="copied" />
      <button
        type="button"
        onClick={() => {
          favoriteToLocalStorage(drinkDetails);
          setIsFavorite(!isFavorite);
        }}
      >
        <img
          src={isFavorite ? blackHeartIcon : whiteHeartIcon}
          alt="icon"
          data-testid="favorite-btn"
        />
      </button>
      <h4 data-testid="recipe-category">
        {`${drinkDetails.strCategory} ${drinkDetails.strAlcoholic} `}{' '}
      </h4>
      <h2>Ingredients</h2>
      {ingredientsAndMeasure
        .filter(
          ({ ingredient }) =>
            ingredient !== null && ingredient !== undefined && ingredient !== ''
        )
        .map(({ ingredient, measure }, index) => (
          <div data-testid={`${index}-ingredient-step`} key={ingredient}>
            <input
              type="checkbox"
              key={ingredient}
              id={ingredient}
              defaultChecked={false}
              onChange={() => toggleCheckbox(index, checked, setChecked)}
            />
            <label
              className={
                checked && checked.includes(index) ? 'checked' : 'notChecked'
              }
              htmlFor={ingredient}
            >{`- ${ingredient} - ${measure}`}</label>
          </div>
        ))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>

      <Link to="/receitas-feitas">
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

export default DrinkDetails;

FoodCard.propTypes = {
  food: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
