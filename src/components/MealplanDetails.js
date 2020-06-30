import React from 'react';
import config from '../config'
import axios from 'axios';
import './MealplanDetail.css';
import { Link } from 'react-router-dom';

export default class MealplanDetails extends React.Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.loadMealplan(this.props.match.params.mealplan_id)
    }

    loadMealplan = (id) => {
        axios.get(`${config.API_URL}/mealplan/${id}`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    // adds mealplan to state:
                    mealplan: res.data,
                    loading: false
                })
            })
            .catch((err) => {
                console.log('Something went wrong', err)
            })
    }

    updateShoppingList = (id) => {
        const updatedShoppingList = this.state.mealplan.shoppingList.map((item) => {
            if (item._id === id) {
                let temporaryItem = { ...item }
                temporaryItem.bought = !temporaryItem.bought
                return temporaryItem
            }
            return item
        })

        axios.put(`${config.API_URL}/mealplan/${this.state.mealplan._id}/shopping_list`, {
            shoppingList: updatedShoppingList
        }, { withCredentials: true })
            .then((res) => {
                this.setState({
                    mealplan: res.data
                })
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <div class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )
        } else {
            console.log(this.state.mealplan)
            return (
                <>
                    <p>{this.state.mealplan.title}</p>
                    <div class="row mealplan-tab">
                        <div class="col-3">
                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link active mealplan-nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Shopping List</a>
                                <a class="nav-link mealplan-nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Recipes</a>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="tab-content" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <ul className='shoppinglist-container'>
                                        {
                                            this.state.mealplan.shoppingList.map((listItem, index) => {
                                                return (
                                                    <li key={index}>
                                                        <input type='checkbox' checked={listItem.bought} onChange={() => { this.updateShoppingList(listItem._id) }} />
                                                        <p>{listItem.quantity}g  {listItem.title}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <div className='recipes-tab'>
                                        {
                                            this.state.mealplan.recipes.map((recipe, index) => {
                                                return (
                                                    <Link to={`/recipe/${recipe._id}`} className='mealplan-recipe-link'>
                                                        <div class="card mealplan-tab-recipe" style={{ width: "18rem" }} key={index}>
                                                            <img src={recipe.image} class="card-img-top" alt="recipe-img" />
                                                            <div class="card-body">
                                                                <h5 class="card-title">{recipe.title}</h5>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )
        }
    }
}