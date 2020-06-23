import React from 'react';
import './Login.css'

export default function Login(props) {

    return (
        <>
            <form class="form-signin" onSubmit={props.onLogin}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Welcome back!</h1>
                </div>

                <div class="form-label-group">
                    <input type="email" name='email' class="form-control form-input" placeholder="Email"/>
                </div>

                <div class="form-label-group">
                    <input type="password" name='password' class="form-control form-input" placeholder="Password"/>
                </div>

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <div>
                    <button class="btn btn-lg btn-info" type="submit">Sign in</button>
                </div>
            </form>
        </>
    )
}