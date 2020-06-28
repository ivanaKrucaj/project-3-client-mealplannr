import React from 'react';
import config from '../config'
import axios from 'axios';

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
        } ,{ withCredentials: true })
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
                    {
                        this.state.mealplan.shoppingList.map((listItem, index) => {
                            return (
                                <ul>
                                    <li key={index}>
                                        <input type='checkbox' checked={listItem.bought} onChange={() => { this.updateShoppingList(listItem._id) }} />
                                        <p>{listItem.quantity}g  {listItem.title}</p>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </>
            )
        }
    }
}