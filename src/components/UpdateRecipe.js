import React from 'react';
import axios from 'axios';
import config from '../config'

export default class UpdateRecipe extends React.Component {

    state = {
        recipe: ''
    }

    componentDidMount() {
        let id = this.props.match.params.recipe_id
        axios.get(`${config.API_URL}/recipe/${id}`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    recipe: res.data
                })
            })
    }

    handleRecipeUpdate = (event) => {
        event.preventDefault();
        let id = this.props.match.params.id
        axios.put(`${config.API_URL}/recipe/${id}`, {
            title: this.state.recipe.title,
            description: this.state.recipe.description,
            image: this.state.recipe.image,
            steps: this.state.recipe.steps,
            ingredients: this.state.recipe.ingredients,
            portions: this.state.recipe.number_of_portions,
            type: this.state.recipe.type
        }, { withCredentials: true })
            .then(() => {
                this.props.onUpdate()
            })
            .then(() => {
                this.props.history.push('/home')
            })
    }

    handleTitleChange = (event) => {
        let newRecipe = JSON.parse(JSON.stringify(this.state.recipe))
        newRecipe.title = event.target.value

        this.setState({
            recipe: newRecipe
        })
    }


    handleDescriptionChange = (event) => {
        let newRecipe = JSON.parse(JSON.stringify(this.state.recipe))
        newRecipe.description = event.target.value

        this.setState({
            recipe: newRecipe
        })
    }

    handleImageChange = (event) => {
        let newRecipe = JSON.parse(JSON.stringify(this.state.recipe))
        newRecipe.image = event.target.value

        this.setState({
            recipe: newRecipe
        })
    }
    handleStepsChange = (event) => {
        let newRecipe = JSON.parse(JSON.stringify(this.state.recipe))
        newRecipe.steps = event.target.value

        this.setState({
            recipe: newRecipe
        })
    }

    handleIngredientsChange = (event) => {
        let newRecipe = JSON.parse(JSON.stringify(this.state.recipe))
        newRecipe.ingredients = event.target.value

        this.setState({
            recipe: newRecipe
        })
    }

    handlePortionsChange = (event) => {
        let newRecipe = JSON.parse(JSON.stringify(this.state.recipe))
        newRecipe.number_of_portions = event.target.value

        this.setState({
            recipe: newRecipe
        })
    }

    handleTypeChange = (event) => {
        let newRecipe = JSON.parse(JSON.stringify(this.state.recipe))
        newRecipe.type = event.target.value

        this.setState({
            recipe: newRecipe
        })
    }

    render() {
        if (!this.state.recipe) {
            return (
                <div class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )
        }

        const { title, description, image, steps, type, ingredients, number_of_portions } = this.state.recipe

        return (
            <>
                <div className='recipe-form'>
                    <form onSubmit={this.handleRecipeUpdate}>
                        <div class="form-group">
                            <input type="text" name='title' class="form-control" onChange={this.handleTitleChange} value={title} />
                        </div>
                        <div class="form-group">
                            <input type="text" name='description' class="form-control" onChange={this.handleDescriptionChange} value={description} />
                        </div>
                        <div class="form-group">
                            <input type="file" name='image' class="form-control" onChange={this.handleImageChange} />
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name='steps' rows="5" onChange={this.handleStepsChange} value={steps}></textarea>
                        </div>
                        <div class="form-group">
                            <input type="text" name='ingredients' class="form-control" onChange={this.handleIngredientsChange} value={ingredients} />
                        </div>
                        <div className='type-portion-div'>
                            <select name='type' className='select-type' value={type} onChange={this.handleTypeChange}>
                                <option disabled selected hidden>Meal type</option>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Snack</option>
                            </select>
                            <div class="form-group">
                                <input type="number" min='0' name='portions' class="form-control" onChange={this.handlePortionsChange} value={number_of_portions} />
                            </div>
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