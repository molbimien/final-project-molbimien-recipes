import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Container } from "@mui/material";
import { API_URL } from "./utils/urls"

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
        <Container>
            <img
                src={recipe?.response?.image}
                alt={recipe?.response?.name}
            />
            <h1>{recipe?.response?.name}</h1>
            <p>{recipe?.response?.description}</p>
            <p>{recipe?.response?.recipeCategory}</p>
            <h2>Ingredienser</h2>
            <div>
            {recipe?.response?.recipeIngredients.map((recipeIngredient, index) => {
                    return (
                        <div key={index}>
                            <p>{recipeIngredient.amount} {recipeIngredient.unit} {recipeIngredient.name}</p>
                        </div>
                    )
                })
            }
            </div>
            <h2>Gör så här</h2>
            <div>
            {recipe?.response?.recipeInstruction.map((recipeInstruction, index) => {
                    return (
                        <div key={index}>
                            <p>{recipeInstruction}</p>
                        </div>
                    )
                })
            }
            </div>
        </Container>
    )
}

export default Recipe