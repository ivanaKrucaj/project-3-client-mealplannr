import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';
import './CSS/MyRecipes.css';

export default class MyRecipes extends React.Component {

    state = {
        recipes: [],
        loading: true
    }

    componentDidMount() {
        this.getRecipes()
    }

    getRecipes = () => {
        axios.get(`${config.API_URL}/my-recipes`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    recipes: res.data,
                    loading: false
                })
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    this.props.history.push('/login')
                }
            })
    }

    deleteRecipe = (id) => {
        axios.delete(`${config.API_URL}/recipe/${id}`, { withCredentials: true })
            .then((res) => {
                this.getRecipes()
            })
    }

    render() {

        //if user is not logged in:
        if (!this.props.loggedInUser) {
            return (
                <div>
                    <div className='mealplan-basket-jumbotron'>
                        <div class="jumbotron">
                            <h5 class="lead">Your are not logged in.</h5>
                            <Link to='/login' class="btn add-mealplan-btn">Log in</Link>
                        </div>
                    </div>
                </div>
            )
        }

        if (this.state.loading) {
            return (
                <div className='loading-div'>
                    <div class="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='my-recipes-page'>
                    <div className='my-recipes-header'>
                        <h1 className='recipes-title'>My recipes</h1>
                    </div>
                    <div className='my-recipes-div'>
                        {
                            this.state.recipes.map((recipe, index) => {
                                return (
                                    <>
                                        <div class="card my-recipes-card" style={{ width: "18rem" }} key={index}>
                                            <Link to={`/recipe/${recipe._id}`} className='my-recipes-recipe-title'>
                                                <img src={recipe.image} class="card-img-top" alt="recipe-img" />
                                                <div class="card-body">
                                                    <h5 class="card-title">{recipe.title}</h5>
                                                </div>
                                            </Link>
                                            <button class="btn recipe-btn" type='submit'>
                                                <Link to={`/edit-recipe/${recipe._id}`} style={{ color: 'black' }}>Edit</Link>
                                            </button>
                                            <button class="btn recipe-btn-delete" type='submit' onClick={() => { this.deleteRecipe(recipe._id) }}>Delete</button>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}