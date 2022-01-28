import React, { useEffect, useState } from 'react'
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'


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
        <Box>
            {recipes.map((recipe) => (
                <div key={recipe._id}>
                    <h2>
                        <Link component={RouterLink}
                        to={`/recept/${recipe.name.toLowerCase()}`}
                        state={{ recipeId: recipe._id }}
                        >
                            {recipe.name}
                        </Link>
                    </h2>
                </div>
            ))}
        </Box>
    )
}

export default RecipeList