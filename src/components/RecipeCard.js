import React from 'react';
import { Link } from 'react-router-dom';
import './Recipes.css';

export default function RecipeCard(props) {
    return (
        <div class="card" style={{ width: '18rem' }} key={props.recipe._id}>
            <Link to={`/recipe/${props.recipe._id}`} >
                <img src={props.recipe.image} class="card-img-top" alt="recipe-img" />
            </Link>
            <div class="card-body">
                <Link to={`/recipe/${props.recipe._id}`} className='recipe-title'>
                    <h5 class="card-title">{props.recipe.title}</h5>
                </Link>
                {props.showAddButton ? <button class="btn btn-primary" onClick={(event) => props.onAddRecipe(event, props.recipe)}>Add to Mealplan</button> : <></>}
                {props.showEditButton ? <button class="btn btn-primary" onClick={(event) => props.onEditRecipe(event, props.recipe)}>Edit Mealplan</button> : <></>}
                {props.showDeleteButton ? <button class="btn btn-primary" onClick={(event) => props.onDeleteRecipe(event, props.recipe)}>Add to Mealplan</button> : <></>}
            </div>
        </div>
    )
}