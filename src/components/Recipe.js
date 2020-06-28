import React from 'react';
import axios from 'axios';
import config from '../config';
import './Recipe.css';

export default class Recipe extends React.Component {

    state = {
        loading: true,
    }

    componentDidMount() {
        let id = this.props.match.params.recipe_id;
        axios.get(`${config.API_URL}/recipe/${id}`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    recipe: res.data,
                    loading: false
                })
            })
            .catch((err) => {
            })
    }

    calculateRecipeNutrition = (recipe) => {
        return recipe.ingredients.reduce((acc, ingredient) => {
            return {
                calories: acc.calories + ingredient.calories / recipe.number_of_portions,
                fat: acc.fat + ingredient.fat / recipe.number_of_portions,
                protein: acc.protein + ingredient.protein / recipe.number_of_portions,
                carbs: acc.carbs + ingredient.carbs / recipe.number_of_portions
            }
        }, {
            calories: 0,
            fat: 0,
            protein: 0,
            carbs: 0
        })
    }

    sanitizeIngredient = (ingredient) => {
        if(ingredient.quantity_unit.includes(ingredient.title)){
            return `${ingredient.quantity} ${ingredient.title}`
        } else {
            return ` ${ingredient.quantity} ${ingredient.quantity_unit}  ${ingredient.title}`
        } 
    }

    render() {

        if (this.state.loading) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            )
        }

        const { title, image, description, steps, ingredients, number_of_portions, type } = this.state.recipe
        const {calories, fat, protein, carbs} = this.calculateRecipeNutrition(this.state.recipe)

        console.log(this.calculateRecipeNutrition(this.state.recipe))
        return (
            <>
                <div className='row'>
                    <div className='col-6 img-div'>
                        <img src={image} alt='recipe-img' />
                    </div>
                    <div className='col-6 title-div'>
                        <h1 className='recipe-title'>{title}</h1>
                        <p>{type}</p>
                        <p>Serves  {number_of_portions}</p>
                        <h5>{description}</h5>
                    </div>
                </div>
                <div className='col-12'>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active recipe-detail-nav" id="method-tab" data-toggle="tab" href="#method" role="tab" aria-controls="method" aria-selected="true">Method</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link recipe-detail-nav" id="nutrition-tab" data-toggle="tab" href="#nutrition" role="tab" aria-controls="nutrition" aria-selected="false">Nutrition per serving</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link recipe-detail-nav" id="ingredients-tab" data-toggle="tab" href="#ingredients" role="tab" aria-controls="ingredients" aria-selected="false">Ingredients</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane active" id="method" role="tabpanel" aria-labelledby="method-tab">{steps}</div>
                        <div class="tab-pane" id="nutrition" role="tabpanel" aria-labelledby="nutrition-tab">{
                            <ul>
                                <li>Calories: {calories.toFixed(2)} kcal</li>
                                <li>Fat: {fat.toFixed(2)} g</li>
                                <li>Protein: {protein.toFixed(2)} g</li>
                                <li>Carbs: {carbs.toFixed(2)} g</li>
                            </ul>
                        }</div>
                        <div class="tab-pane" id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab">
                            {
                                ingredients.map((ingredient, index) => {
                                    return (
                                        <ul>
                                            <li key={index}>{this.sanitizeIngredient(ingredient)}</li>
                                        </ul>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}