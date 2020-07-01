import React from 'react';
import './CSS/Login.css'

export default function Signup(props){

    return(
        <>
        <form class="form-signin" onSubmit={props.onSignup}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 login-title">Not a member yet?</h1>
                </div>

                <div class="form-label-group">
                    <input type="text" name='username' class="form-control form-input" placeholder="Username" />
                </div>

                <div class="form-label-group">
                    <input type="email" name='email' class="form-control form-input" placeholder="Email" />
                </div>

                <div class="form-label-group">
                    <input type="password" name='password' class="form-control form-input" placeholder="Password" required="" />
                </div>
                <div>
                    <button class="btn btn-lg btn-signup btn-trans" type="submit">Create an account</button>
                </div>
            </form>
        </>
    )
}