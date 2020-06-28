import React from 'react';
import FontAwesome from 'react-fontawesome';

export default function FilterRecipes(props) {

    return (
        <>
            <div class="field">
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-rounded" name='recipe' type="text" onChange={props.onFilter} value={props.filter} placeholder='Search' />
                    <span class="icon is-left">
                        <FontAwesome
                            class="fa fa-search"
                            name="search"
                            size='1x'
                            style={{ color: 'lightgrey' }}
                        />
                    </span>
                </div>
            </div>
        </>
    )
}