import React from 'react';
import config from '../config'
import axios from 'axios';

export default class MealplanDetails extends React.Component {

    state = {
        loading: true
    }

    componentDidMount() {
        const id = this.props.match.params.mealplan_id
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
                </>
            )
        }
    }
}