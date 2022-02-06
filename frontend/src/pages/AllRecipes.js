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
                    display: 'grid',
                    gridGap: '10px'
                }}
            >
                <h1>Alla recept</h1>
                    <FilterRecipes />
            </Container>
        </>
    )
}
    
export default AllRecipes