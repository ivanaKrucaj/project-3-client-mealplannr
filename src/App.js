import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'bulma/css/bulma.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
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
import FilterRecipes from './components/FilterRecipes';
import UpdateRecipe from './components/UpdateRecipe';
import MyRecipes from './components/MyRecipes';

class App extends React.Component {

  state = {
    recipes: [],
    loggedInUser: null,
    filterText: '',
    mealplanBasket: []
  }

  getRecipes = () => {
    axios.get(`${config.API_URL}/recipes`)
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
  getUser = () => {
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
    this.setState({
      mealplanBasket: JSON.parse(localStorage.getItem('currentMealplanBasket')) || []
    })
    this.getRecipes();
    if (!this.state.loggedInUser) {
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
    axios.post(`${config.API_URL}/logout`)
      .then((res) => {
        //empties local storage:
        localStorage.setItem('currentMealplanBasket', '[]')
        this.setState({
          loggedInUser: null,
          mealplanBasket: []
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

    this.setState({
      filterText: recipeInput
    })
  }

  filterRecipes = () => {
    return this.state.recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(this.state.filterText.toLowerCase())
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
        <div className='header'>
          <Navbar
            loggedInUser={this.state.loggedInUser}
            numberOfItemsInBasket={this.state.mealplanBasket.length}
            onLogout={this.handleLogout}
          />
        </div>
        <div className='home-div'>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
            <Route exact path='/home' render={(routeProps) => {
              return (
                <>
                  <Header />
                  <div className='container'>
                    <div className='filter-div'>
                      <h1 className='recipes-title'>Recipes</h1>
                      <FilterRecipes
                        filter={this.state.filterText}
                        onFilter={this.handleFilterRecipes}
                      />
                    </div>
                    <Recipes
                      filteredRecipes={this.filterRecipes()}
                      onAddToMealplan={this.handleAddToMealplan}
                      showAddButton={false}
                      {...routeProps} />
                  </div>
                </>
              )
            }} />
            <Route path='/mealplans' render={() => {
              return (
                <div className='container'>
                  <AllMealplans
                    loggedInUser={loggedInUser}
                  />
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
              return (
                <div className='container'>
                  <Recipe
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
            <Route exact path='/mealplan-basket' render={() => {
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
            <Route exact path="/edit-recipe/:recipe_id" render={(routeProps) => {
              return (
                <>
                  <UpdateRecipe
                    loggedInUser={loggedInUser}
                    {...routeProps}
                    onUpdate={this.getRecipes}
                  />
                </>
              )
            }} />
            <Route path='/my-recipes' render={(routeProps) => {
              return (
                <div className='container'>
                  <MyRecipes
                    loggedInUser={loggedInUser}
                    {...routeProps}
                  />
                </div>
              )
            }} />
          </Switch>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
