import React from 'react';
import './CreateRecipe.css'

export default function CreateRecipe(props) {

    return (
        <>
            <h1>Create recipe</h1>
            <div className='recipe-form'>
                <form onSubmit={props.onAdd}>
                    <div class="form-group">
                        <input type="text" name='title' class="form-control" placeholder="Title" />
                    </div>
                    <div class="form-group">
                        <input type="text" name='description' class="form-control" placeholder="Description" />
                    </div>
                    <div class="form-group">
                        <input type="file" name='image' class="form-control" />
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" name='steps' rows="5" placeholder='Steps'></textarea>
                    </div>
                    <div class="form-group">
                        <input type="text" name='ingredients' class="form-control" placeholder="Ingredients" />
                    </div>
                    <select name='type'>
                        <option>Meal type</option>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snack</option>
                    </select>
                    <div class="form-group">
                        <input type="number" name='portions' class="form-control" placeholder="Number of portions" />
                    </div>
                    <div>
                        <button type="submit" class="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}