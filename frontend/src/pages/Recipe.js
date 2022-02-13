import React, { useEffect, useState } from "react"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Container, Box, Button, Checkbox, Link, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

    const handleLikesClick = (recipeId) => {
        const options = {
          method: 'POST',
        }
      
        fetch(API_URL(`recipes/${recipeId}/like`), options)
          .then((res) => res.json())
          .then((json) => {
            setRecipe(json)
          })
      }

      const recipeFont = createTheme({
        typography: {
          fontFamily: [
            'Charmonman',
          ].join(','),
      },});

    return (
        <>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Link component={RouterLink}
                        to="/">
                        <ArrowBackIosIcon 
                            color='primary'
                        />
                    </Link>
                    <Checkbox {...label} 
                        icon={<FavoriteBorder color='primary'/>} 
                        checkedIcon={<Favorite color='primary'/>}
                        id={recipeId}
                    />
                </Box>
            </Container>
            <Box
                sx={{
                    display: 'flex',
                    height: '400px',
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
            <Container
                sx= {{
                    marginBottom: '50px',
                }}
            >
            <h1>{recipe?.response?.name}</h1>
            <ThemeProvider theme={recipeFont}>
                <Typography
                            variant="h6"
                            style={{
                             textAlign: 'center',
                             marginBlockEnd: '0.67em',
                            }}
                        >
                            "{recipe?.response?.description}"
                        </Typography>
            </ThemeProvider>
            {/* <p>{recipe?.response?.description}</p> */}
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                    
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
                        handleLikesClick(recipeId)
                    }}
                >
                    <ThumbUpIcon
                        color='primary'
                        style={{marginRight: '5px'}}
                    />{recipe?.response?.likes}
                </Button>
                </Box>
            </Box>
            <h2>Ingredienser</h2>
            <div>
                {recipe?.response?.ingredients.map((ingredient, index) => {
                    return (
                        <p key={index}>
                            {ingredient.recipeIngredientAmount} {ingredient.recipeIngredientUnit} {ingredient.recipeIngredient}
                        </p>
                    )
                })
            }
            </div>
            <h2>Gör så här</h2>
            <div
                style={{whiteSpace: "pre-line"}} // keep line-breaks from content added in add recipe form
            >
                {recipe?.response?.recipeInstruction}
                {/* {recipe?.response?.recipeInstruction.map((recipeInstruction, index) => {
                        return (
                            <p key={index}>
                                {recipeInstruction}
                            </p>
                        )
                    })
                } */}
            </div>
        </Container>
        </>
    )
}

export default Recipe