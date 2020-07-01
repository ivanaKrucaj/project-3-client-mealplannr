import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Recipes.css';

export default function Recipes(props) {
    if (props.loading) {
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
            <div >
                <div className='home-recipes'>
                    {
                        props.filteredRecipes.map((recipe, index) => {
                            return (
                                <>
                                    <div class="card recipe-card" style={{ width: '18rem' }} key={index}>
                                        <Link to={`/recipe/${recipe._id}`} >
                                            <img src={recipe.image} class="card-img-top" alt="recipe-img" />
                                        </Link>
                                        <div class="card-body">
                                            <Link to={`/recipe/${recipe._id}`} className='recipe-title'>
                                                <h5 class="card-title">{recipe.title}</h5>
                                            </Link>
                                            <button class="btn add-mealplan-btn" onClick={(event) => props.onAddToMealplan(event, recipe)}>Add to Mealplan</button>
                                        </div>
                                    </div>
                                </>)
                        })
                    }
                </div>
            </div>

        )
    }
}