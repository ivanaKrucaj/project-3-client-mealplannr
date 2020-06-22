import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import {withRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
// import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Mealplans from './components/Mealplans';
import CreateRecipe from './components/CreateRecipe';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navbar />
      <div class='container'>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route path='/mealplans' component={Mealplans} />
          <Route path='/create-recipe' component={CreateRecipe} />
        </Switch>
      <Footer/>
      </div>

    </div>
  );
}

export default App;
