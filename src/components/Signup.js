import React from 'react';
import './Login.css'

export default function Signup(props){

    return(
        <>
        <form class="form-signin" onSubmit={props.onSignup}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Not a member yet?</h1>
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

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <div>
                    <button class="btn btn-lg btn-warning" type="submit">Create an account</button>
                </div>
            </form>
        </>
    )
}