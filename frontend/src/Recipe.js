import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
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
        <div>
            <h3>{recipe?.response?.name}</h3>
            <p>{recipe?.response?.description}</p>
        </div>
    )
}

export default Recipe