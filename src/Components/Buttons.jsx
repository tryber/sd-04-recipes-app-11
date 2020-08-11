// import React, { useState } from 'react';
// import copyToClipboard from 'clipboard-copy';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import { useEffect } from 'react';
// import { useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// function favoriteToLocalStorage(recipe) {
//   const {
//     idMeal: id,
//     strCategory: category,
//     strArea: area,
//     strMeal: name,
//     strMealThumb: image,
//   } = recipe;
//   const type = 'comida';
//   const alcoholicOrNot = '';

//   const currentFavoriteRecipes = localStorage.getItem('favoriteRecipes')
//     ? JSON.parse(localStorage.getItem('favoriteRecipes'))
//     : [];

//   const favoriteRecipes = [
//     ...currentFavoriteRecipes,
//     { id, type, area, category, alcoholicOrNot, name, image },
//   ];
//   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
// }

// const Buttons = (props) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const {foodDetails} = useContext(AppContext);

//   useEffect(() => {
//     const loadFavorite = () => {
//       const { id } = props.match.params;
//       const currentFavorite = JSON.parse(
//         localStorage.getItem('favoriteRecipes')
//       );
//       setIsFavorite(currentFavorite.some((curr) => curr.id === id));
//       if (localStorage.getItem('favoriteRecipes')) loadFavorite();
//     };
//   }, []);
//   return (
//     <div>
//       <button
//         type="button"
//         onClick={() => {
//           copyToClipboard(window.location.href);
//           document.getElementById('copied').innerHTML = 'Link copiado!';
//         }}
//       >
//         <img src={shareIcon} alt="icon" data-testid="share-btn" />
//       </button>
//       <div id="copied" />
//       <button
//         type="button"
//         onClick={() => {
//           favoriteToLocalStorage(foodDetails);
//           setIsFavorite(!isFavorite);
//         }}
//       >
//         <img
//           src={!isFavorite ? whiteHeartIcon : blackHeartIcon}
//           alt="icon"
//           data-testid="favorite-btn"
//         />
//       </button>
//     </div>
//   );
// };

// export default Buttons;