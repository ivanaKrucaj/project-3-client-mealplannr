import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import Mealplans from './components/Mealplans';
import CreateRecipe from './components/CreateRecipe';
import Footer from './components/Footer';
import Login from './components/Login'


class App extends React.Component {

  state = {
    recipes: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/recipes')
      .then((res) => {
        this.setState({
          recipes: res.data
        })
      })
  }

  handleCreateRecipe = (event) => {
    event.preventDefault();
    let title = event.target.title.value;
    let description = event.target.description.value;
    let image = event.target.image.value;
    let steps = event.target.steps.value;
    let ingredients = event.target.ingredients.value;
    let type = event.target.type.value;
    let portions = event.target.portions.value;

    axios.post('http://localhost:5000/api/recipe', {
      title: title,
      description: description,
      image: image,
      steps: steps,
      ingredients: ingredients,
      type: type,
      number_of_portions: portions
    })
      .then((res) => {
        this.setState({
          recipes: [...this.state.recipes, res.data]
        }, () => {
          this.props.history.push('/home')
        })
      })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div class='container'>
          <Switch>
            <Route exact path='/home' render={() => {
              return <Recipes recipes={this.state.recipes} />
            }} />
            <Route path='/login' component={Login} />
            <Route path='/mealplans' component={Mealplans} />
            <Route path='/create-recipe' render={() => {
              return <CreateRecipe onAdd={this.handleCreateRecipe} />
            }} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
