import React, { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Box, Link, Button } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


import { API_URL } from "../utils/urls"

const RecipeCard = (props) => {
    const [recipe, setRecipe] = useState([])

    useEffect(() => {
        fetch(API_URL(`recipes/id/${props.recipeId}`))
            .then((res) => res.json())
            .then((json) => {
                setRecipe(json)
            })
    }, [props.likes, props.recipeId])

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
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button size="small">
                        <AccessTimeIcon
                            color='primary'
                            style={{marginRight: '5px'}}
                        /> {recipe?.response?.recipeCookingTime}
                        </Button>
                    </Box>
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button size="small">
                        <MenuBookIcon
                            color='primary'
                            style={{marginRight: '5px'}}
                        /> {recipe?.response?.recipeCategory}
                        </Button>
                    </Box>
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                        size="small"
                        onClick={() => {
                            props.onLikesIncrease(props.recipeId)
                        }}
                    >
                        <ThumbUpIcon
                            color='primary'
                            style={{marginRight: '5px'}}
                        />{recipe?.response?.likes}
                    </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RecipeCard