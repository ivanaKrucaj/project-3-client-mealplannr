import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
    return (
        <div className='my-nav'>
            <nav class="navbar navbar-expand my-navbar sticky-top">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav nav-list">
                        <li class="nav-item">
                            <Link to='/home' class="nav-link">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/mealplan-basket' class="nav-link">Mealplans Basket</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/create-recipe' class="nav-link">Create recipe</Link>                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                User Account
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to='/mealplans' class="dropdown-item">My Mealplans</Link>
                                <a class="dropdown-item" href="#">My recipes</a>
                                <a class="dropdown-item" href="#">Favorites</a>
                                <a class="dropdown-item" onClick={props.onLogout}>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}