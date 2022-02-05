import React, { useEffect, useState } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
import { Box, Link } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { API_URL } from "../utils/urls"

const RecipeCard = (props) => {
    const [recipe, setRecipe] = useState([])
    const { recipeId } = useParams()

    useEffect(() => {
        fetch(API_URL(`recipes/id/${props.recipeId}`))
            .then((res) => res.json())
            .then((json) => {
                setRecipe(json)
            })
    }, [recipeId, props.recipeId])

    const replaceSpecialChars = (str) => {
        return str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
            .replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
            .replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
            .toLowerCase()
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: '10px'
            }}
        >
            <img
                src={recipe?.response?.image}
                alt={recipe?.response?.name}
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
                        to={`/recept/${recipe?.response?._id}/${replaceSpecialChars(recipe?.response?.name)}`}
                    >
                        {recipe?.response?.name}
                    </Link>
                </h2>
                <p>{recipe?.response?.description}</p>
                <p
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <MenuBookIcon
                        color='primary'
                        style={{marginRight: '5px'}}
                    /> {recipe?.response?.recipeCategory}
                </p>
            </Box>
        </Box>
    )
}

export default RecipeCard