import React from 'react';
import axios from 'axios';
import config from '../config';
import './Recipe.css'
import { Redirect } from 'react-router-dom';  

export default class Recipe extends React.Component {

    state = {
        recipe: ''
    }

    componentDidMount() {
        let id = this.props.match.params.recipe_id;
        axios.get(`${config.API_URL}/recipe/${id}`, { withCredentials: true } )    
            .then((res) => {
                this.setState({
                    recipe: res.data
                })
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.history.push('/login')
                }
            })
    }

    render() {

        // checking if user is logged in:
        if (!this.props.loggedInUser) {                
            console.log(this.props.loggedInUser)
            return <Redirect to='/login' />
        }

        if (!this.state.recipe) {
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }

        const { title, image, description, steps, ingredients, number_of_portions, type } = this.state.recipe

        return (
            <>
                <div className='row'>
                    <div className='col-6 img-div'>
                        <img src={image} alt='recipe-img' />
                    </div>
                    <div className='col-6 title-div'>
                        <h1 className='recipe-title'>{title}</h1>
                        <small>{type}</small> 
                        <small>{number_of_portions} portion/s</small>
                        <h5>{description}</h5>
                    </div>
                </div>
                <div className='col-12'>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Steps</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Nutrition</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Ingredients</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">{steps}</div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">nutrition info</div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">{ingredients}</div>
                    </div>
                </div>
            </>
        )
    }
}