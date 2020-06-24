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
import Signup from './components/Signup';
import Recipe from './components/Recipe';


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
        if (err.response.status === 401) {
          this.props.history.push('/login')
        }
      })
  }

  // get user credentials:
  getUser() {
    axios.get(`${config.API_URL}/user`, {}, { withCredentials: true })
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
    })
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/home')
        })
      })
  }

  // // create recipe via form:
  // handleCreateRecipe = (event) => {
  //   event.preventDefault();
  //   let title = event.target.title.value;
  //   let description = event.target.description.value;
  //   let steps = event.target.steps.value;
  //   let ingredients = event.target.ingredients.value;
  //   let type = event.target.type.value;
  //   let portions = event.target.portions.value;

  //   axios.post('http://localhost:5000/api/recipe', {
  //     title: title,
  //     description: description,
  //     steps: steps,
  //     ingredients: ingredients,
  //     type: type,
  //     number_of_portions: portions
  //   })
  //     .then((res) => {
  //       this.setState({
  //         recipes: [...this.state.recipes, res.data]
  //       }, () => {
  //         this.props.history.push('/home')
  //       })
  //     })
  // }

  // handleFileUpload = (event) => {
  //   event.preventDefault();
  //   let image = event.target.image.files[0];

  //   let uploadData = new FormData();
  //   uploadData.append('imageUrl', image)

  //   axios.post(`${config.API_URL}/upload`, uploadData)
  //     .then((res) => {

  //     })
  // }


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

  render() {
    const { loggedInUser } = this.state

    return (
      <div>
        <Navbar loggedInUser={this.state.loggedInUser} onLogout={this.handleLogout} />
        <div class='container'>
          <Switch>
            <Route exact path='/home' render={() => {
              return <Recipes
                recipes={this.state.recipes} />
            }} />
            <Route path='/mealplans' render={() => {
              return <Mealplans
                loggedInUser={loggedInUser}
              />
            }} />
            <Route path='/create-recipe' render={(routeProps) => {
              return <CreateRecipe
                loggedInUser={loggedInUser}
                // uploadFile={this.handleFileUpload}
                // onAdd={this.handleCreateRecipe} 
                {...routeProps}
              />
            }} />
            <Route path='/recipe/:recipe_id' render={(routeProps) => {
              return <Recipe
              // loggedInUser={loggedInUser}
                {...routeProps}
              />
            }} />
            <Route path='/login' render={(routeProps) => {
              return <div className='forms'>
                <Login
                  onLogin={this.handleLogin}
                  loggedInUser={loggedInUser}
                  {...routeProps} />
                <Signup
                  onSignup={this.handleSignup}
                  {...routeProps} />
              </div>
            }} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
