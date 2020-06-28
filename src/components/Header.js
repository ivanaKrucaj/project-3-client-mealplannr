import React from 'react';
import { Link } from 'react-router-dom';
import Plate from '../images/plate-img.png'

export default function Header() {
    return (
        <>
            <div className='header-teaser row'>
                <div className='text-teaser-div col-4'>
                    <h1 className='teaser-title'>Quick and Easy Way <br /> to Healthier Life</h1>
                    <p className='teaser-par'>Use our Meal Planning Tool <br /> to Add Recipes to Your Meal Plan.</p>
                    <Link to='/login'>
                        <button className='login-btn btn btn-lg'>Join us</button>
                    </Link>
                </div>
                <div className='header-img-div col-3'>
                    <img src={Plate} alt='background-img' className='header-img' />
                </div>

            </div>
        </>
    )
}