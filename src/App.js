import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from 'axios';
import config from './config'
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import Mealplans from './components/Mealplans';
import CreateRecipe from './components/CreateRecipe';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup'


class App extends React.Component {

  state = {
    recipes: [],
    loggedInUser: null
  }

  getRecipes = () => {
    axios.get('http://localhost:5000/api/recipes')
    .then((res) => {
      this.setState({
        recipes: res.data
      })
    })
    .catch((err) => {
      if(err.response.status === 401) {
        this.props.history.push('/login')
      }
    })
  }

  // get user credentials:
  getUser(){
    axios.get(`${config.API_URL}/user`, {withCredentials: true})
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.props.history.push('/login')
        }
      })
  }

  componentDidMount() {
   this.getRecipes();
   if(!this.state.loggedInUser) {
      this.getUser();
   }
  }

  // signup:
  handleSignup = (event) => {
    event.preventDefault();
    let username = event.target.username.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    axios.post(`${config.API_URL}/signup`, {
      username: username,
      email: email,
      password: password
    }, { withCredentials: true })
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/home')
        })
      })

  }

  // login:
  handleLogin = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;

    axios.post(`${config.API_URL}/signin`, {
      email: email,
      passwordHash: password
    })
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/home')
        })
      })
  }

  // create recipe via form:
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
            <div className='forms'>
              <Route path='/login' render={(routeProps) => {
                return <Login onLogin={this.handleLogin} {...routeProps} />
              }} />
              <Route path='/login' render={(routeProps) => {
                return <Signup onSignup={this.handleSignup} {...routeProps} />
              }} />
            </div>
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
