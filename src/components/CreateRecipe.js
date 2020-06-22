import React from 'react';
import './CreateRecipe.css'

export default class CreateRecipe extends React.Component {
    render() {
        return (
            <>
                <h1>Create recipe</h1>
                <div className='recipe-form'>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Title" />
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Description" />
                        </div>
                        <div class="form-group">
                            <input type="file" class="form-control" />
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" rows="5" placeholder='Steps'></textarea>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Ingredients" />
                        </div>
                    </form>
                </div>
            </>
        )
    }
}