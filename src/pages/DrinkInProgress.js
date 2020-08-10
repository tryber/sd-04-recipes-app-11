import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getDrinkById from '../services/getDrinkById';
// import DrinkDetails from './DrinkDetails';

export default function DrinkInProgress() {
  const [drink, setDrink] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [inputs, setInputs] = useState([]);
  const { id } = useParams();
  // const { addIngredient } = DrinkDetails(drink);
  const { drinkDetails, setDrinkDetails, foods, setFoods } = useContext(
      AppContext,
    );

  const ArrayIngredients = () => {
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
  };
  
  useEffect(() => {
    getDrinkById(id).then(({ drink: { drinks } }) => {
      setDrink(drinks[0]);
      setIngredients(ArrayIngredients(drinks[0]));
    });
  }, [id]);

  // useEffect(() => {
  //   addIngredient('cocktails', id, inputs);
  // }, [inputs]);

  function handleInput(event) {
    if (inputs.includes(event)) {
      setInputs(inputs.filter((input) => input !== event));
    } else {
      setInputs([...inputs, event]);
    }
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={drink.strDrinkThumb} alt="foto" />
      <div>
        <h3 data-testid="recipe-title">{drink.strDrink}</h3>
        <h5 data-testid="recipe-category">
          {drink.strCategory}
        </h5>
      </div>
      <div>
        <img data-testid="share-btn" src={shareIcon} alt="share" />
        <img data-testid="favorite-btn" src={whiteHeartIcon} alt="share" />
      </div>
      <div>
        <h4>Ingredients</h4>
        <div>
          {ingredients.map((ingredient, index) => (
            <div key={ingredient}>
              <input
                data-testid={`${index}-ingredient-step`}
                type="checkbox"
                value={ingredient}
                onClick={(e) => handleInput(e.target.value)}
              />
              <label htmlFor={ingredient} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4>Instructions</h4>
        <p data-testid="instructions">
          {drink.strInstructions}
        </p>
      </div>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}
