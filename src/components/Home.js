import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Mealplannr</h1>
                <div className='home-recipes'>
                    <Link to='/mealplans'>
                        <div class="card" style={{ width: '18rem' }}>
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Spaghetti Bolognese</h5>
                                <p class="card-text">The best of Italy.</p>
                                <button class="btn btn-primary"><Link to="/mealplans" style={{ color: 'white' }}>Add to mealplan</Link></button>
                            </div>
                        </div>
                    </Link>
                    <Link to='/mealplans'>
                        <div class="card" style={{ width: '18rem' }}>
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Spaghetti Bolognese</h5>
                                <p class="card-text">The best of Italy.</p>
                                <button class="btn btn-primary"><Link to="/mealplans" style={{ color: 'white' }}>Add to mealplan</Link></button>
                            </div>
                        </div>
                    </Link>
                    <Link to='/mealplans'>
                        <div class="card" style={{ width: '18rem' }}>
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Spaghetti Bolognese</h5>
                                <p class="card-text">The best of Italy.</p>
                                <button class="btn btn-primary"><Link to="/mealplans" style={{ color: 'white' }}>Add to mealplan</Link></button>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

        )
    }
}