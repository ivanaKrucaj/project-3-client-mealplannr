import React from 'react';
import axios from 'axios';
import config from '../config';
import './Recipe.css';
import FontAwesome from 'react-fontawesome';

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
        if (ingredient.quantity_unit.includes(ingredient.title)) {
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

        const { title, image, steps, ingredients, number_of_portions, type } = this.state.recipe
        const { calories, fat, protein, carbs } = this.calculateRecipeNutrition(this.state.recipe)

        console.log(this.calculateRecipeNutrition(this.state.recipe))
        return (
            <div className='recipe-detail-div'>
                <div className='row recipe-detail-teaser'>
                    <div className='col-6 img-div'>
                        <img src={image} alt='recipe-img' className='recipe-detail-img' />
                    </div>
                    <div className='col-6 title-div'>
                        <h1 className='recipe-title'>{title}</h1>
                        <p>{type}</p>
                        <p>Serves  <b>{number_of_portions}</b></p>
                    </div>
                </div>
                <div className='col-12 recipe-detail-tabs'>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active recipe-detail-nav" id="method-tab" data-toggle="tab" href="#method" role="tab" aria-controls="method" aria-selected="true">Method</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link recipe-detail-nav" id="nutrition-tab" data-toggle="tab" href="#nutrition" role="tab" aria-controls="nutrition" aria-selected="false">Nutrition</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link recipe-detail-nav" id="ingredients-tab" data-toggle="tab" href="#ingredients" role="tab" aria-controls="ingredients" aria-selected="false">Ingredients</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane active tab-method" id="method" role="tabpanel" aria-labelledby="method-tab">
                            <p className='method-par'>{steps}</p>
                        </div>
                        <div class="tab-pane tab-nutrition" id="nutrition" role="tabpanel" aria-labelledby="nutrition-tab">{
                            <>
                                <h3 className='nutrition-tab-title'>Nutrition Facts</h3>

                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nutrients</th>
                                            <th scope="col">Amount Per Serving</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Calories</td>
                                            <td>{calories.toFixed(2)} kcal</td>
                                        </tr>
                                        <tr>
                                            <td>Fat</td>
                                            <td>{fat.toFixed(2)} g</td>
                                        </tr>
                                        <tr>
                                            <td>Protein</td>
                                            <td>{protein.toFixed(2)} g</td>
                                        </tr>
                                        <tr>
                                            <td>Carbs</td>
                                            <td>{carbs.toFixed(2)} g</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        }</div>
                        <div class="tab-pane tab-ingredients" id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab">
                            <h3 className='nutrition-tab-title'>Recipe ingredients</h3>
                            <ul className='ingredients-container'>
                                {
                                    ingredients.map((ingredient, index) => {
                                        return (
                                            <li key={index}>
                                                <FontAwesome
                                                    class="fa fa-apple"
                                                    name="apple"
                                                    style={{ color: 'lightgray', fontSize: '13px' }}
                                                />
                                                {this.sanitizeIngredient(ingredient)}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}