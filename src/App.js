import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './Components/Login';
import './App.css';

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas" component={Login} />
        <Route exact path="/bebidas" component={Login} />
        <Route exact path="/comidas/{id-da-receita}" component={Login} />
        <Route exact path="/bebidas/{id-da-receita}" component={Login} />
        <Route
          exact
          path="/comidas/{id-da-receita}/in-progress"
          component={Login}
        />
        <Route
          exact
          path="/bebidas/{id-da-receita}/in-progress"
          component={Login}
        />
        <Route exact path="/explorar" component={Login} />
        <Route exact path="/explorar/comidas" component={Login} />
        <Route exact path="/explorar/bebidas" component={Login} />
        <Route exact path="/explorar/comidas/ingredientes" component={Login} />
        <Route exact path="/explorar/bebidas/ingredientes" component={Login} />
        <Route exact path="/explorar/comidas/area" component={Login} />
        <Route exact path="/perfil" component={Login} />
        <Route exact path="/receitas-feitas" component={Login} />
        <Route exact path="/receitas-favoritas" component={Login} />
      </Switch>
    </BrowserRouter>
  </AppProvider>
);

export default App;
