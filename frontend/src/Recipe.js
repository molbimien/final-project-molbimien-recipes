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
            <h3>{recipe?.response?.name}</h3>
            <p>{recipe?.response?.description}</p>
        </Container>
    )
}

export default Recipe