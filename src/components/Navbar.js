import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Navbar.css';

export default function Navbar(props) {
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
                                  Mealplan Basket
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/create-recipe' class="nav-link">
                                   Create Recipe
                                </Link>
                            </li>
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    User Account
                                </Link>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link to='/mealplans' class="dropdown-item">My Mealplans</Link>
                                    <Link to='/my-recipes' class="dropdown-item">My Recipes</Link>
                                    <hr />
                                    <Link class="dropdown-item" onClick={props.onLogout}>Logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}