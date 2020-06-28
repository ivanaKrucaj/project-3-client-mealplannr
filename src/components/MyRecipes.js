import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import config from '../config'

export default class MyRecipes extends React.Component {

    state = {
        recipes: [],
        loading: true
    }

    componentDidMount() {
        this.getRecipes()
    }

    getRecipes = () => {
        axios.get('http://localhost:5000/api/my-recipes', { withCredentials: true })
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
        axios.delete(`${config.API_URL}/recipe/${id}`, {withCredentials: true})
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
            <>
                {
                    this.state.recipes.map((recipe, index) => {
                        return (
                            <>
                                <div class="card" style={{ width: "18rem" }} key={index}>
                                    <Link to={`/recipe/${recipe._id}`}>
                                        <img src={recipe.image} class="card-img-top" alt="recipe-img" />
                                        <div class="card-body">
                                            <h5 class="card-title">{recipe.title}</h5>
                                        </div>
                                    </Link>
                                    <button class="edit-btn" type='submit'>
                                        <Link to={`/edit-recipe/${recipe._id}`} style={{ color: 'white' }}>
                                            <FontAwesome
                                                class="fa fa-edit"
                                                name="edit"
                                                size='2px'
                                                style={{ color: 'white' }}
                                            />
                                        </Link>
                                    </button>
                                    <button class="edit-btn" type='submit' onClick={() => {this.deleteRecipe(recipe._id)}}>Delete
                                            <FontAwesome
                                                class="fa fa-delete"
                                                name="delete"
                                                size='2px'
                                                style={{ color: 'white' }}
                                            />
                                    </button>
                                </div>
                            </>
                        )
                    })
                }
            </>
        )
    }
}