import React from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';

export default class AllMealplans extends React.Component {

    state = {
        mealplans: [],
        filteredMealplans: [],
        loading: true
    }

    componentDidMount() {
        this.loadMealplans()
    }

    loadMealplans = () => {
        axios.get(`${config.API_URL}/mealplans`, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                this.setState({
                    mealplans: res.data,
                    loading: false,
                    filteredMealplans: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteMealplan = (id) => {
        axios.delete(`${config.API_URL}/mealplan/${id}`, { withCredentials: true })
            .then((res) => {
                this.loadMealplans()
            })
    }

    filterMealplan = (event) => {
        let mealplanInput = event.target.value

        let newMealplans = this.state.mealplans.filter((mealplan) => {
          return mealplan.title.toLowerCase().includes(mealplanInput.toLowerCase())
        })
    
        this.setState({
          filteredMealplans: newMealplans
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
            return (
                <>
                    <p>All Mealplans</p>
                    <input onChange={this.filterMealplan}/>
                    {
                        this.state.filteredMealplans.map((mealplan, index) => {
                            return (
                                <>

                                    <div key={index} class="card" style={{ width: '18rem' }}>
                                        <Link to={`/mealplan/${mealplan._id}`}>
                                            <img src={mealplan.recipes[0].image} class="card-img-top" alt="recipe-img" />
                                            <div class="card-body">
                                                <h5 class="card-title">{mealplan.title}</h5>
                                            </div>
                                        </Link>
                                        <button className='btn btn-outline-danger' onClick={() => { this.deleteMealplan(mealplan._id) }}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </>
            )
        }

    }
}