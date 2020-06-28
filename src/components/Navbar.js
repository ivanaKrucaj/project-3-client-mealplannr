import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import FontAwesome from 'react-fontawesome';

export default function Navbar(props) {
    return (
        <div className='intro-div'>
            <div>
                <h1>Mealplannr</h1>
            </div>
            <div className='my-nav'>
                <nav class="navbar navbar-expand my-navbar">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav nav-list">
                            <li class="nav-item">
                                <Link to='/home' class="nav-link">
                                    <FontAwesome
                                        class="fa fa-home"
                                        name="home"
                                        size='2x'
                                        style={{ color: 'white', padding: '0 20px 0 0' }}
                                    />
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/mealplan-basket' class="nav-link">
                                    <FontAwesome
                                        class="fa fa-shopping-basket"
                                        name="shopping-basket"
                                        size='2x'
                                        style={{ color: 'white', padding: '0 20px 0 0' }}
                                    />
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/create-recipe' class="nav-link">
                                    <FontAwesome
                                        class="fa fa-plus-circle"
                                        name="plus-circle"
                                        size='2x'
                                        style={{ color: 'white', padding: '0 20px 0 0' }}
                                    />
                                </Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesome
                                        class="fa fa-user"
                                        name="user"
                                        size='2x'
                                        style={{ color: 'white' }}
                                    />
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link to='/mealplans' class="dropdown-item">My Mealplans</Link>
                                    <Link to='/my-recipes' class="dropdown-item">My Recipes</Link>
                                    <a class="dropdown-item" href="#">Favorites</a>
                                    <hr />
                                    <a class="dropdown-item" onClick={props.onLogout}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}