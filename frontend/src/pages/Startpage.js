import React from 'react'
import { Container, Box } from '@mui/material'
import RecipeList from '../components/RecipeList'
import Header from '../components/Header'

const Startpage = () => {
    return (
        <>
        <Header />
            <Container
                sx={{
                    display: 'grid',
                    gridGap: '10px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <h2>Senaste recepten</h2>
                    <p>Se alla recept</p>
                </Box>
                <RecipeList />
            </Container>
        </>
    )
}

export default Startpage