import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Navbar.css';

export default function Navbar(props) {

    const recipeCount = props.numberOfItemsInBasket > 0 ? `${props.numberOfItemsInBasket}` : ''

    const userAccount = props.loggedInUser ? <>{props.loggedInUser.username}'s Account </> : 'User Account'

    return (
        <div className='intro-div fixed-top'>
            <div className='my-nav'>
                <nav class="navbar navbar-expand my-navbar">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav nav-list">
                            <li class="nav-item">
                                <Link to='/home' class="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/mealplan-basket' class="nav-link">
                                    Mealplan Basket <span class="badge badge-pill badge-danger">{recipeCount}</span>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/create-recipe' class="nav-link">
                                    Create Recipe
                                </Link>
                            </li>
                            <li class="nav-item dropright">
                                <Link class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {userAccount}
                                </Link>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link to='/mealplans' class="dropdown-item">
                                    My Mealplans
                                    </Link>
                                    <Link to='/my-recipes' class="dropdown-item">
                                    My Recipes
                                    </Link>
                                    <div class="dropdown-divider"></div>
                                    <Link class="dropdown-item logout-item" onClick={props.onLogout}>Logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}