import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
// import logo from './images/logo.png'
import axios from 'axios';
import config from './config'
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import MealplanBasket from './components/MealplanBasket';
import CreateRecipe from './components/CreateRecipe';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Recipe from './components/Recipe';
import Header from './components/Header';
import AllMealplans from './components/AllMealplans';
import MealplanDetails from './components/MealplanDetails';
import FilterRecipes from './components/FilterRecipes'


class App extends React.Component {

  state = {
    recipes: [],
    loggedInUser: null,
    mealplanBasket: [],
    filteredRecipes: []
  }

  getRecipes = () => {
    axios.get('http://localhost:5000/api/recipes')
      .then((res) => {
        this.setState({
          recipes: res.data,
          filteredRecipes: res.data
        })
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.props.history.push('/login')
        }
      })
  }

  // get user credentials:
  getUser() {
    axios.get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        })
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.props.history.push('/login')
        }
      })
  }

  componentDidMount() {
    this.getRecipes();
    if (!this.state.loggedInUser) {
      this.getUser();
    }
    this.setState({
      mealplanBasket: JSON.parse(localStorage.getItem('currentMealplanBasket'))|| []
    })
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

  handleLogout = () => {
    console.log(document.cookie)
    axios.post(`${config.API_URL}/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res)
        this.setState({
          loggedInUser: null
        }, () => {
          this.props.history.push('/login')
        })
      })
  }

  recipeCreated = (recipe) => {
    this.setState({
      recipes: [...this.state.recipes, recipe]
    }, () => {
      this.props.history.push('/home')
    })
  }

  handleAddToMealplan = (event, recipe) => {
    event.preventDefault();
    let newMealplan = [...this.state.mealplanBasket]
    newMealplan.push(recipe)
    localStorage.setItem('currentMealplanBasket', JSON.stringify(newMealplan))
    this.setState({
      mealplanBasket: newMealplan
    })
  }

  handleSaveMealplan = (event) => {
    event.preventDefault();
    let mealplanName = event.target.mealplanName.value;

    axios.post(`${config.API_URL}/mealplan`, {
      title: mealplanName,
      recipes: this.state.mealplanBasket
    }, { withCredentials: true })
      .then((res) => {
        this.setState({
          mealplanBasket: []
        })
        // empties local storage:
        localStorage.setItem('currentMealplanBasket', JSON.stringify([]))
        this.props.history.push('/mealplans')
      })
  }

  handleFilterRecipes = (event) => {
    let recipeInput = event.target.value

    let newRecipes = this.state.recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(recipeInput.toLowerCase())
    })

    this.setState({
      filteredRecipes: newRecipes
    })
  }

  handleDeleteRecipeFromMealplanBasket = (recipeToDelete) => {
    const mealplansNotDeleted = JSON.parse(localStorage.getItem('currentMealplanBasket')).filter((recipe) => {
        return recipe._id !== recipeToDelete._id
    })
    localStorage.setItem('currentMealplanBasket', JSON.stringify(mealplansNotDeleted));
    this.setState({
      mealplanBasket: mealplansNotDeleted
    })
  }

  render() {
    const { loggedInUser } = this.state

    return (
      <>
        {/* <div className='logo-header'>
          <img src={logo} className='logo' alt='mealplannr-logo' />
        </div> */}
        <div className='header'>
          <Navbar loggedInUser={this.state.loggedInUser} onLogout={this.handleLogout} />
        </div>
        <Switch>
          <Route exact path='/home' render={(routeProps) => {
            return (
              <>
                <Header />
                <div className='container'>
                  <h1>Our recipes</h1>
                  <FilterRecipes onFilter={this.handleFilterRecipes} />
                  <Recipes 
                    filteredRecipes={this.state.filteredRecipes}
                    // recipes={this.state.recipes}
                    onAddToMealplan={this.handleAddToMealplan}
                    {...routeProps} />
                </div>
              </>
            )
          }} />
          <Route path='/mealplans' render={() => {
            return (
              <div className='container'>
                <AllMealplans />
              </div>
            )
          }} />
          <Route path='/create-recipe' render={(routeProps) => {
            return (
              <div className='container'>
                <CreateRecipe
                  loggedInUser={loggedInUser}
                  onRecipeCreated={this.recipeCreated}
                  {...routeProps}
                />
              </div>
            )
          }} />
          <Route path='/recipe/:recipe_id' render={(routeProps) => {
            return (<div className='container'>
              <Recipe
                loggedInUser={loggedInUser}
                {...routeProps}
              />
            </div>)
          }} />
          <Route path='/login' render={(routeProps) => {
            return <div className='forms container'>
              <Login
                onLogin={this.handleLogin}
                {...routeProps} />
              <Signup
                onSignup={this.handleSignup}
                {...routeProps} />
            </div>
          }} />
          <Route exact path='/recipe-list' render={() => {
            return (
              <>
                <MealplanBasket
                  loggedInUser={loggedInUser}
                  mealplanBasket={this.state.mealplanBasket}
                  onSaveMealplan={this.handleSaveMealplan}
                  onDelete={this.handleDeleteRecipeFromMealplanBasket}
                />
              </>
            )
          }} />
          <Route exact path='/mealplan/:mealplan_id' render={(routeProps) => {
            return (
              <>
                <MealplanDetails
                  loggedInUser={loggedInUser}
                  {...routeProps}
                />
              </>
            )
          }} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
