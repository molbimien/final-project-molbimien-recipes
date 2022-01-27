import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { API_URL } from './utils/urls'

const RecipeList = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch(API_URL('recipes'))
            .then((res) => res.json())
            .then((json) => {
                setRecipes(json)
            })
    }, [])

    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe._id}>
                    <h2>
                        <Link to={`/recept/${recipe.name}/${recipe._id}`}>
                            {recipe.name}
                        </Link>
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default RecipeList