import React, { useEffect, useState } from 'react'
import { Box, Link } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link as RouterLink } from 'react-router-dom'

import { API_URL } from '../utils/urls'

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
        <Box
            sx={{
                display: 'grid',
                gridGap: '10px'
            }}
        >
            {recipes?.map((recipe) => (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridGap: '10px'
                    }}
                    key={recipe._id}>
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '10px'
                                
                            }}
                        />
                    <Box
                        sx={{
                            gridColumn: 'span 2'
                        }}
                    >
                    <h2>
                        <Link component={RouterLink}
                            to={`/recept/${recipe.name.toLowerCase()}`}
                            state={{ recipeId: recipe._id }}
                        >
                            {recipe.name}
                        </Link>
                    </h2>
                    <p>{recipe.description}</p>
                    <p
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <MenuBookIcon
                            color='primary'
                            style={{marginRight: '5px'}}
                        /> {recipe.recipeCategory}
                    </p>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default RecipeList