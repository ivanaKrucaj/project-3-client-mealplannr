import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';
import FontAwesome from 'react-fontawesome';
import './MyRecipes.css';

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

        if (this.state.loading) {
            return (
                <div class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )
        }

        if (!this.props.loggedInUser) {
            return (
                <div className="text-center">
                    <p>Please sign in.</p>
                </div>
            )
        }

        return (
            // <Recipes filteredRecipes={this.state.recipes}/>
            <>
            <div className='my-recipes-header'>
                <h1 className='mealplan-basket-title'>My recipes</h1>
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
                                            <Link to={`/edit-recipe/${recipe._id}`} style={{ color: 'white' }}>
                                                <FontAwesome
                                                    class="fa fa-edit"
                                                    name="edit"
                                                    style={{ color: 'white' }}
                                                />
                                            </Link>
                                        </button>
                                        <button class="btn recipe-btn" type='submit' onClick={() => { this.deleteRecipe(recipe._id) }}>
                                            <FontAwesome
                                                class="fa fa-trash"
                                                name="trash"
                                                style={{ color: 'white' }}
                                            />
                                        </button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}