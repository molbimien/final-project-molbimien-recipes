import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Container, Box } from "@mui/material";
import { API_URL } from "../utils/urls"

const Recipe = () => {
    const [recipe, setRecipe] = useState([])
    const location = useLocation()

    const { recipeId } = location.state

    useEffect(() => {
        fetch(API_URL(`recipes/id/${recipeId}`))
            .then((res) => res.json())
            .then((json) => {
                setRecipe(json)
                console.log(json)
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