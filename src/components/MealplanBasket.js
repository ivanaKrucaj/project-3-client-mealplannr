import React from 'react';
import { Link } from 'react-router-dom'

export default function MealplanBasket(props) {

    //add message
    if (!props.loggedInUser) {
        return (<p>Please login</p>)
    }

    return (
        <div className='mealplan-basket-div container'>
            <h1 className='recipes-title'>Mealplan Basket</h1>
            <form onSubmit={props.onSaveMealplan} className='mealplan-name-form'>
                <input type='text' className='mealplan-input' name='mealplanName' placeholder='Mealplan name' />
                <button type='submit' className='btn save-mealplan-btn'>Save mealplan</button>
            </form>
            <div className='home-recipes'>
            {
                props.mealplanBasket.map((recipe, index) => {
                    return (
                        <>
                            <div class="card basket-card" style={{ width: '18rem' }} key={index}>
                                <Link to={`/recipe/${recipe._id}`} >
                                    <img src={recipe.image} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{recipe.title}</h5>
                                    </div>
                                </Link>
                                <div className='delete-div'>
                                <button className='btn mealplan-basket-delete' onClick={() => { props.onDelete(recipe) }}>Remove</button>
                                </div>
                            </div>
                        </>)
                })
            }
            </div>
        </div>
    )
}