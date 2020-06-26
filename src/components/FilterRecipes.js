import React from 'react'

export default function FilterRecipes(props){
    return(
        <>
        <form >
            <input name='recipe' type='text' onChange={props.onFilter}/>
        </form>
        </>
    )
}