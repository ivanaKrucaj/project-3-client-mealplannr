import React from 'react';
import axios from 'axios';
import config from '../config';

export default class UpdateRecipe extends React.Component {

    state = {
        recipe: ''
    }

    componentDidMount() {
        let id = this.props.match.params.recipe_id
        axios.get(`${config.API_URL}/recipe/${id}`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    recipe: res.data,
                    imageSource: res.data.image
                })
            })
    }

    handleRecipeUpdate = (event) => {
        event.preventDefault();
        let id = this.props.match.params.recipe_id

        // if imageSource and recipe image urls are different we need to first upload the image
        if (this.state.imageSource !== this.state.recipe.image) {
            let image = event.target.image.files[0];
            let uploadData = new FormData();
            uploadData.append('imageUrl', image)

            axios.post(`${config.API_URL}/upload`, uploadData)
                .then((res) => {
                    this.updateRecipe(id, res.data.secure_url)
                })
        } else {
            this.updateRecipe(id, this.state.recipe.image)
        }
    }

    updateRecipe = (id, image_url) => {
        axios.put(`${config.API_URL}/recipe/${id}`, {
            title: this.state.recipe.title,
            image: image_url,
            steps: this.state.recipe.steps,
            ingredients: this.state.recipe.ingredientText,
            number_of_portions: this.state.recipe.number_of_portions,
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

    handleImageChange = (event) => {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onloadend = () => {
            this.setState({
                imageSource: reader.result
            })
        }
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
        newRecipe.ingredientText = event.target.value

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
            const { title, steps, type, number_of_portions, ingredientText } = this.state.recipe

            return (
                <>
                    <div className='recipe-form edit-recipe-form'>
                        <h1 className='recipes-title'>Edit your recipe</h1>
                        <div className='recipe-form'>
                            <form onSubmit={this.handleRecipeUpdate}>
                                <div class="form-group">
                                    <input type="text" name='title' class="form-control create-form-input" onChange={this.handleTitleChange} value={title} />
                                </div>
                                <div class="form-group">
                                    <img src={this.state.imageSource} alt="recipe-img" />
                                    <input type="file" name='image' class="form-control create-file-input" onChange={this.handleImageChange} />
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control create-steps-input" name='steps' rows="5" onChange={this.handleStepsChange} value={steps}></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="text" name='ingredients' class="form-control create-ingredient-input" onChange={this.handleIngredientsChange} value={ingredientText} />
                                </div>
                                <div className='type-portion-div type-portion-div'>
                                    <select name='type' className='select-type' value={type} onChange={this.handleTypeChange}>
                                        <option disabled selected hidden>Meal type</option>
                                        <option>Breakfast</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                        <option>Snack</option>
                                    </select>
                                    <div class="form-group">
                                        <input type="number" min='0' name='portions' class="form-control portions-input" onChange={this.handlePortionsChange} value={number_of_portions} />
                                    </div>
                                </div>
                                <div className='submit-form-bnt-div'>
                                    <button type="submit" class="btn submit-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )
        }
    }
}