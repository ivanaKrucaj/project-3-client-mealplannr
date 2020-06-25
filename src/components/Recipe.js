import React from 'react';
import axios from 'axios';
import config from '../config';
import './Recipe.css';

export default class Recipe extends React.Component {

    state = {
        recipe: ''
    }

    componentDidMount() {
        let id = this.props.match.params.recipe_id;
        axios.get(`${config.API_URL}/recipe/${id}`, { withCredentials: true })
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

        if (!this.state.recipe || !this.props.loggedInUser) {
            return (
                <div>
                    <p>Please log in.</p>
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
                        <p>{type}</p>
                        <p>Serves {number_of_portions}</p>
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
                        <div class="tab-pane" id="nutrition" role="tabpanel" aria-labelledby="nutrition-tab">nutrition info</div>
                        <div class="tab-pane" id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab">
                        {/* {
                            ingredients.map()
                        } */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}