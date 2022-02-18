import React from 'react'
import { Container } from '@mui/material'
import Header from '../components/Header'
import FilterRecipes from '../components/FilterRecipes'

const AllRecipes = () => {
    return (
        <>
            <Header />
            <Container
                sx={{
                    textAlign: {
                      md: 'center', // theme.breakpoints.up('md')
                    },
                  }}
            >
                <h1>Alla recept</h1>
            </Container>
            <FilterRecipes />
        </>
    )
}
    
export default AllRecipes