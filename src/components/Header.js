import React from 'react';
import { Link } from 'react-router-dom';
import Food from '../images/header-bg-img-tr.png'

export default function Header() {
    return (
        <>
            <div className='header-teaser '>
                <div>
                    <h1 className='teaser-title'>Quick and Easy Way <br /> to Healthier Life</h1>
                    <p className='teaser-par'>Use our Meal Planning Tool <br /> to Add Recipes to Your Meal Plan.</p>
                    <Link to='/login'>
                        <button className='login-btn btn btn-lg'>Join us</button>
                    </Link>
                </div>
                <div className='header-img-div'>
                    <img src={Food} alt='background-img' className='header-img' />
                </div>

            </div>
        </>
    )
}