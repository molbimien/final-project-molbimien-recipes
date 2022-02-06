import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Box, Checkbox } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

import { API_URL } from "../utils/urls"

const label = { inputProps: { 'aria-label': 'Bookmark button' } };

const Recipe = () => {
    const [recipe, setRecipe] = useState([])

    const { recipeId } = useParams()

    useEffect(() => {
        fetch(API_URL(`recipes/id/${recipeId}`))
            .then((res) => res.json())
            .then((json) => {
                setRecipe(json)
            })
    }, [recipeId])

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    height: '250px',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={recipe?.response?.image}
                    alt={recipe?.response?.name}
                    style={{
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>
            <Container>
            <h1>{recipe?.response?.name}</h1>
            <Checkbox {...label} 
                icon={<FavoriteBorder color='primary'/>} 
                checkedIcon={<Favorite color='primary'/>}
            />
            <p>{recipe?.response?.description}</p>
            <p>{recipe?.response?.recipeCategory}</p>
            <h2>Ingredienser</h2>
            <div>
                {recipe?.response?.recipeIngredients.map((recipeIngredient, index) => {
                    return (
                        <p key={index}>
                            {recipeIngredient.amount} {recipeIngredient.unit} {recipeIngredient.name}
                        </p>
                    )
                })
            }
            </div>
            <h2>Gör så här</h2>
            <div>
                {recipe?.response?.recipeInstruction.map((recipeInstruction, index) => {
                        return (
                            <p key={index}>
                                {recipeInstruction}
                            </p>
                        )
                    })
                }
            </div>
        </Container>
        </>
    )
}

export default Recipe