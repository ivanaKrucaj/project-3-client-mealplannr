import React from 'react';
import axios from 'axios';
import config from '../config';
import { Redirect } from 'react-router-dom';

export default class Recipe extends React.Component {

    state = {
        recipe: ''
    }

    componentDidMount() {

        let id = this.props.match.params.recipe_id;
        console.log(id)
        axios.get(`${config.API_URL}/recipe/${id}`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    recipe: res.data
                })
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.history.push('/login')
                }
            })
    }

    render() {

        // checking if user is logged in:
        if (!this.props.loggedInUser) {
            console.log(this.props.loggedInUser)
            return <Redirect to='/login' />
        }

        if (!this.state.recipe) {
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }

        const { title, image, description, steps, ingredients, number_of_portions, type } = this.state.recipe

        return (
            <>
                <div>
                    <div>
                        <img src={image} alt='recipe-img' />
                    </div>
                    <div>
                        <h1>{title}</h1>
                        <h5>{description}</h5>
                    </div>
                </div>
                <div>
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link " href="#">Steps</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Nutrition</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Ingredients</a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}