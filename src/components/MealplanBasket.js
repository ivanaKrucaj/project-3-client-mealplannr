import React from 'react';
import { Link } from 'react-router-dom'

export default function MealplanBasket(props) {

    //add message
    if (!props.loggedInUser) {
        return (<p>Please login</p>)
    }

    return (
        <>
            <h1>Mealplan Basket</h1>
            <form onSubmit={props.onSaveMealplan}>
                <input type='text' name='mealplanName' placeholder='Mealplan name' />
                <button type='submit' className='btn btn-lg btn-info'>Save mealplan</button>
            </form>
            {
                props.mealplanBasket.map((recipe, index) => {
                    return (
                        <>
                            <div class="card" style={{ width: '18rem' }} key={index}>
                                <Link to={`/recipe/${recipe._id}`} >
                                    <img src={recipe.image} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{recipe.title}</h5>
                                    </div>
                                </Link>
                                <button className='btn btn-outline-danger' onClick={() => { props.onDelete(recipe) }}>Delete</button>
                            </div>
                        </>)
                })
            }
        </>
    )
}