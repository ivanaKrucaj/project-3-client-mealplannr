import React from 'react';
import { Redirect } from 'react-router-dom'

export default function Mealplans(props) {

    if (!props.loggedInUser) {
        return <Redirect to='/login' />
    }
    return (
        <>
            <h1 className='animate__animated animate__heartBeat'>Mealplan page</h1>
        </>
    )
}