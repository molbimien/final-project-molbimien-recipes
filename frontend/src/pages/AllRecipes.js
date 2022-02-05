import React from 'react'
import { Container } from '@mui/material'
import RecipeList from '../components/RecipeList'

const AllRecipes = () => {
    return (
        <>
            <Container
                sx={{
                    display: 'grid',
                    gridGap: '10px'
                }}
            >
                <h1>Recept</h1>
                <p>filtrera listan</p>
                <RecipeList />
            </Container>
        </>
    )
}
    
export default AllRecipes