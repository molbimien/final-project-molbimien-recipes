import React, { useEffect, useState } from "react"
import { Button } from "@mui/material";

import { API_URL } from "../utils/urls"

const CookingTime = (props) => {
    const [recipe, setRecipe] = useState([])

    useEffect(() => {
        fetch(API_URL('recipes'))
            .then((res) => res.json())
            .then((json) => {
                setRecipe(json)
            })
    }, [props.recipeCookingTime, props.recipeId])

    return (
        <>
            <Button 
                variant="outlined"
                size="small"
            >
                {props.recipeCookingTime}
            </Button>
        </>
    )
}

export default CookingTime