import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material";

import { API_URL } from '../utils/urls'
import RecipeCard from './RecipeCard';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetchRecipes() // Fetch recipes with likes when component is mounted
      }, [])
      
      const fetchRecipes = () => {
        fetch(API_URL('recipes'))
          .then((res) => res.json())
          .then((json) => {
            setRecipes(json)
        })
      }

      const handleLikesIncrease = (recipeId) => {
        const options = {
          method: 'POST',
        }
      
        fetch(API_URL(`recipes/${recipeId}/like`), options)
          .then((res) => res.json())
          .then((json) => {
            fetchRecipes(json)
          })
      }

    return (
        <Box
        sx={{
            display: 'grid',
            gridGap: '10px'
        }}
        >
            {recipes.map((recipe) => (
                    <RecipeCard 
                        key={recipe._id}
                        recipeId={recipe._id}
                        image={recipe.image}
                        name={recipe.name}
                        description={recipe.description}
                        hearts={recipe.hearts}
                        onLikesIncrease={handleLikesIncrease}
                    />
                )
            )}
        </Box>
    )
}

export default RecipeList