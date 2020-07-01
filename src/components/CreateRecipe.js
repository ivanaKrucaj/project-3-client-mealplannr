import React from 'react';
import './CSS/CreateRecipe.css';
import axios from 'axios';
import config from '../config'

export default class CreateRecipe extends React.Component {

    // create recipe via form:
    handleCreateRecipe = (event) => {
        event.preventDefault();
        let title = event.target.title.value;
        let steps = event.target.steps.value;
        let ingredients = event.target.ingredients.value;
        let type = event.target.type.value;
        let portions = event.target.portions.value;
        let image = event.target.image.files[0];

        let uploadData = new FormData();
        uploadData.append('imageUrl', image)

        axios.post(`${config.API_URL}/upload`, uploadData)
            .then((res) => {
                axios.post(`${config.API_URL}/recipe`, {
                    title: title,
                    steps: steps,
                    ingredients: ingredients,
                    type: type,
                    image: res.data.secure_url,
                    number_of_portions: portions,
                    user: this.props.loggedInUser
                }, { withCredentials: true })
                    .then((res) => {
                        this.props.onRecipeCreated(res.data)
                    })
            })
    }

    render() {
        // checking if user is logged in:
        // if (!this.props.loggedInUser) {
        //     return null
        // }

        if (!this.props.loggedInUser) {
            return (
                <div className="text-center">
                    <p>Please sign in.</p>
                </div>
            )
        }

        return (
            <div className='create-recipe-div'>
                <h1 className='recipes-title'>Create recipe</h1>
                <div className='recipe-form'>
                    <form onSubmit={this.handleCreateRecipe}>
                        <div class="form-group">
                            <input type="text" name='title' class="form-control create-form-input" placeholder="Title" />
                        </div>
                        <div class="form-group">
                            <input type="file" name='image' class="form-control create-file-input" />
                        </div>
                        <div class="form-group">
                            <textarea class="form-control create-steps-input" name='steps' rows="5" placeholder='Steps'></textarea>
                        </div>
                        <div class="form-group">
                            <input type="text" name='ingredients' class="form-control create-ingredient-input" placeholder="Ingredients" />
                        </div>
                        <div className='form-group type-portion-div'>
                            <select name='type' className='select-type'>
                                <option disabled selected hidden>Meal type</option>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Snack</option>
                            </select>
                            <input type="number" min='0' name='portions' class="form-control portions-input" placeholder="Portions" />
                        </div>
                        <div className='submit-form-bnt-div'>
                            <button type="submit" class="btn submit-btn">Submit recipe</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}