import React from 'react';
import { Link } from 'react-router-dom';
import './Recipes.css';
import config from '../config'

export default function Recipes(props) {
    return (
        <>
            <div className='home-recipes'>
                {
                    props.filteredRecipes.map((recipe, index) => {
                        return (
                            <>
                                <Link to={`/recipe/${recipe._id}`} >
                                    <div class="card" style={{ width: '18rem' }} key={index}>
                                        <img src={recipe.image} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{recipe.title}</h5>
                                            <button class="btn btn-primary" type='submit'><Link to={`/edit-recipe/${recipe._id}`} style={{ color: 'white' }}>Edit</Link></button>
                                            <button class="btn btn-primary" onClick={(event) => props.onAddToMealplan(event, recipe)}><Link to="/mealplan-basket" style={{ color: 'white' }}>Add to Mealplan</Link></button>
                                        </div>
                                    </div>
                                </Link>
                            </>)
                    })
                }
            </div>
        </>

    )
}