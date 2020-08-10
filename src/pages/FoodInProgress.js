import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getFoodById from '../services/getFoodById';
import FoodDetails from './FoodDetails';

export default function FoodInProgress() {
  const [meal, setMeal] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ Like, setLike ] = useState(true);
  const { id } = useParams();
  const [inputs, setInputs] = useState([]); // acho que o erro é aqui. 
  const { addIngredient } = FoodDetails(meal);
  const { drinkDetails, setDrinkDetails, foods, setFoods } = useContext(AppContext);


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
    getFoodById(id).then(({ meal: { meals } }) => {
      setMeal(meals[0]);
      setIngredients(ArrayIngredients(meals[0]));
    });
  }, [id]);

  useEffect(() => {
    addIngredient('meals', id, inputs);
  }, [inputs]);

  function handleInput(event) {
    if (inputs.includes(event)) {
      setInputs(inputs.filter((input) => input !== event));
    } else {
      setInputs([...inputs, event]);
    }
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={meal.strMealThumb} alt="foto" />
      <div>
        <h3 data-testid="recipe-title">{meal.strMeal}</h3>
        <h5 data-testid="recipe-category">{meal.strCategory}</h5>
      </div>
      <div>
        <img data-testid="share-btn" src={shareIcon} alt="share" />
        <img data-testid="favorite-btn" src={Like ? blackHeartIcon : whiteHeartIcon} alt="share" />
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
        <p data-testid="instructions">{meal.strInstructions}</p>
      </div>
      <div>
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}
