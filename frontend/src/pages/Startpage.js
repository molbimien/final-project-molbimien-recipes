import React from 'react'
import { Container, Box } from '@mui/material'
import RecipeList from '../RecipeList'
import Header from '../Header'

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
                <h2>Mina favoritrecept just nu</h2>
                <RecipeList />
                <h2>Mest gillade recept</h2>
                <RecipeList />
            </Container>
        </>
    )
}

export default Startpage