import React from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

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
        //if user is not logged in:
        if (!this.props.loggedInUser) {
            return (
                <div>
                    <div className='mealplan-basket-jumbotron'>
                        <div class="jumbotron">
                            <h5 class="lead">Your are not logged in.</h5>
                            <Link to='/login' class="btn add-mealplan-btn">Log in</Link>
                        </div>
                    </div>
                </div>
            )
        }

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
            return (
                <div className='mealplans-page-div'>
                    <div className='mealplan-header'>
                        <h1 className='recipes-title'>My Mealplans</h1>
                        <div class="field">
                            <div class="control has-icons-left has-icons-right">
                                <input class="input is-rounded" name='recipe' type="text" onChange={this.filterMealplan} placeholder='Search' />
                                <span class="icon is-left">
                                    <FontAwesome
                                        class="fa fa-search"
                                        name="search"
                                        size='1x'
                                        style={{ color: 'lightgrey' }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='all-mealplans-div'>
                        {
                            this.state.filteredMealplans.map((mealplan, index) => {
                                return (
                                    <div key={index} class="card recipe-card" style={{ width: '18rem' }}>
                                        <Link to={`/mealplan/${mealplan._id}`}>
                                            <img src={mealplan.recipes[0].image} class="card-img-top" alt="recipe-img" />
                                        </Link>
                                        <div class="card-body">
                                            <Link to={`/mealplan/${mealplan._id}`}>
                                                <h5 class="card-title">{mealplan.title}</h5>
                                            </Link>
                                        </div>
                                        <div className='delete-div'>
                                            <button className='btn mealplan-basket-delete' onClick={() => { this.deleteMealplan(mealplan._id) }}>Delete mealplan</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }

    }
}