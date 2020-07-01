import React from 'react';
import './CSS/Login.css';

export default function Login(props) {

    return (
        <>
            <form class="form-signin" onSubmit={props.onLogin}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 login-title">Welcome back!</h1>
                </div>

                <div class="form-label-group">
                    <input type="email" name='email' class="form-control form-input" placeholder="Email"/>
                </div>

                <div class="form-label-group">
                    <input type="password" name='password' class="form-control form-input" placeholder="Password"/>
                </div>
                <div>
                    <button class="btn btn-lg btn-login btn-trans" type="submit">Sign in</button>
                </div>
            </form>
        </>
    )
}