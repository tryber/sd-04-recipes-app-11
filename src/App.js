import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './Components/Header';
import {
  DrinkDetails,
  DrinkIngredients,
  DrinkInProgress,
  Drinks,
  Explore,
  ExploreDrinks,
  ExploreFoods,
  FavoriteRecipes,
  FoodDetails,
  FoodIngredients,
  FoodInProgress,
  Foods,
  FoodsByOrigin,
  Login,
  NotFound,
  Profile,
  RecipesDone,
} from './pages';
import './App.css';

const App = () => (
  <AppProvider>
    <Header></Header>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas" component={Foods} />
        <Route exact path="/bebidas" component={Drinks} />
        <Route exact path="/comidas/:id" component={FoodDetails} />
        <Route exact path="/bebidas/:id" component={DrinkDetails} />
        <Route exact path="/comidas/:id/in-progress" component={FoodInProgress} />
        <Route exact path="/bebidas/:id/in-progress" component={DrinkInProgress} />
        <Route exact path="/explorar" component={Explore} />
        <Route exact path="/explorar/comidas" component={ExploreFoods} />
        <Route exact path="/explorar/bebidas" component={ExploreDrinks} />
        <Route exact path="/explorar/comidas/ingredientes" component={FoodIngredients} />
        <Route exact path="/explorar/bebidas/ingredientes" component={DrinkIngredients} />
        <Route exact path="/explorar/comidas/area" component={FoodsByOrigin} />
        <Route exact path="/perfil" component={Profile} />
        <Route exact path="/receitas-feitas" component={RecipesDone} />
        <Route exact path="/receitas-favoritas" component={FavoriteRecipes} />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </AppProvider>
);

export default App;