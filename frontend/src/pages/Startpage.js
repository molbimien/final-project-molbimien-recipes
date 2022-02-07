import React from 'react'
import { Link as RouterLink } from "react-router-dom"
import { Container, Box, Link } from '@mui/material'
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
                    <Link component={RouterLink}
                    to="/recept">Se alla recept
                    </Link>
                </Box>
                <RecipeList />
            </Container>
        </>
    )
}

export default Startpage