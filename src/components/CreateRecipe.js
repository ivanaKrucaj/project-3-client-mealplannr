import React from 'react';
import './CreateRecipe.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../config'

export default class CreateRecipe extends React.Component {


    // create recipe via form:
    handleCreateRecipe = (event) => {
        event.preventDefault();
        let title = event.target.title.value;
        let description = event.target.description.value;
        let steps = event.target.steps.value;
        let ingredients = event.target.ingredients.value;
        let type = event.target.type.value;
        let portions = event.target.portions.value;

        axios.post('http://localhost:5000/api/recipe', {
            title: title,
            description: description,
            steps: steps,
            ingredients: ingredients,
            type: type,
            number_of_portions: portions
        }, { withCredentials: true })
            .then((res) => {
                this.setState({
                    recipes: [...this.state.recipes, res.data]
                }, () => {
                    this.props.history.push('/home')
                })
            })
    }


    handleFileUpload = (event) => {
        event.preventDefault();
        let image = event.target.files[0];

        let uploadData = new FormData();
        uploadData.append('imageUrl', image)


        axios.post(`${config.API_URL}/upload`, uploadData)
            .then((res) => {

            })
    }


    render() {
        // checking if user is logged in:
        if (!this.props.loggedInUser) {
            return <Redirect to='/login' />
        }
        return (
            <>
                <h1>Create recipe</h1>
                <div className='recipe-form'>
                    <form onSubmit={this.handleCreateRecipe}>
                        <div class="form-group">
                            <input type="text" name='title' class="form-control" placeholder="Title" />
                        </div>
                        <div class="form-group">
                            <input type="text" name='description' class="form-control" placeholder="Description" />
                        </div>
                        <div class="form-group">
                            <input type="file" onChange={this.uploadFile} name='image' class="form-control" />
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name='steps' rows="5" placeholder='Steps'></textarea>
                        </div>
                        <div class="form-group">
                            <input type="text" name='ingredients' class="form-control" placeholder="Ingredients" />
                        </div>
                        <select name='type'>
                            <option>Meal type</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Snack</option>
                        </select>
                        <div class="form-group">
                            <input type="number" name='portions' class="form-control" placeholder="Number of portions" />
                        </div>
                        <div>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}