import React, { useEffect, useState } from "react"
import { Button } from "@mui/material";

import { API_URL } from "../utils/urls"

const MainIngredient = (props) => {
    const [recipe, setRecipe] = useState([])

    useEffect(() => {
        fetch(API_URL('recipes'))
            .then((res) => res.json())
            .then((json) => {
                setRecipe(json)
            })
    }, [props.recipeMainIngredient, props.recipeId])

    return (
        <>
            <Button 
                variant="outlined"
                size="small"
            >
                {props.recipeMainIngredient}
            </Button>
        </>
    )
}

export default MainIngredient