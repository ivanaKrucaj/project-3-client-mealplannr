import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

export default function Recipes(props) {

    return (
        <div>
            <h1>Mealplannr</h1>
            <div className='home-recipes'>
                {
                    props.recipes.map((recipe, index) => {
                        return (
                            <>
                                <Link to='/home/:recipe_id'>
                                    <div class="card" style={{ width: '18rem' }} key={index}>
                                        <img src={recipe.image} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{recipe.title}</h5>
                                            <p class="card-text">{recipe.description}</p>
                                            <button class="btn btn-primary"><Link to="/mealplans" style={{ color: 'white' }}>Add to mealplan</Link></button>
                                        </div>
                                    </div>
                                </Link>
                            </>)
                    })
                }
            </div>
        </div>

    )
}