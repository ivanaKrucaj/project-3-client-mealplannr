import React from 'react';
import { Link } from 'react-router-dom';

export default function MealplanBasket(props) {

    //if user is not logged in:
    if (!props.loggedInUser) {
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
        const mealplan = () => {
            return (
                <><div className='mealplan-basket-div container'>
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
                </>
            )
        }

        const jumbotron = () => {
            return (
                <div className='mealplan-basket-jumbotron'>
                    <div class="jumbotron">
                        <h5 class="lead">Your mealplan basket is empty.</h5>
                        <p className='jumbo-par'>Create a personalized mealplan in just a few clicks .</p>
                        <Link to='/home' class="btn add-mealplan-btn">Add recipes</Link>
                    </div>
                </div>
            )
        }

        return (
            <div className='full-height-view'>
                {props.mealplanBasket.length === 0 ? jumbotron() : mealplan()}
            </div>
        )
    }
}