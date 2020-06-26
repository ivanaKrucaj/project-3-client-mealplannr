import React from 'react'

export default function FilterRecipes(props) {
    return (
        <>
            <input name='recipe' type='text' onChange={props.onFilter} />
        </>
    )
}