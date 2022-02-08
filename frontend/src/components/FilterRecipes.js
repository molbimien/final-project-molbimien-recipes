import React, { useEffect, useState }  from 'react'
import { Box, Container } from '@mui/material'
import RecipeCard from './RecipeCard';
import Category from './Category';
import CookingTime from './CookingTime';
import MainIngredient from './MainIngredient';
import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { API_URL } from '../utils/urls'

const FilterRecipes = () => {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetchRecipes()
      }, [])
      
      const fetchRecipes = () => {
        fetch(API_URL('recipes'))
          .then((res) => res.json())
          .then((json) => {
            setRecipes(json)
        })
      }

      const handleLikesIncrease = (recipeId) => {
        const options = {
          method: 'POST',
        }
      
        fetch(API_URL(`recipes/${recipeId}/like`), options)
          .then((res) => res.json())
          .then((json) => {
            fetchRecipes(json)
          })
      }

      const recipesByCategory = []
      recipes.forEach(recipe => {
          if (!recipesByCategory.includes(recipe.recipeCategory)) {
              recipesByCategory.push(recipe.recipeCategory)
          } 
        })

      const recipesByMainIngredient = []
      recipes.forEach(recipe => {
          if (!recipesByMainIngredient.includes(recipe.recipeMainIngredient)) {
            recipesByMainIngredient.push(recipe.recipeMainIngredient)
          } 
        })

      const recipesByCookingTime = []
      recipes.forEach(recipe => {
          if (!recipesByCookingTime.includes(recipe.recipeCookingTime)) {
            recipesByCookingTime.push(recipe.recipeCookingTime)
          } 
      })

    return (
        <>
        <Box
            sx={{
                backgroundColor: '#eeeeee',
                paddingBottom: '16px',
            }}
        >
            <Container>
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <p>filtrera listan</p>
                <FilterAltIcon />
            </Box>
            <p>Typ av rätt</p>
            <Box>
                {recipesByCategory.map(recipe => (
                    <Category
                        key={recipe}
                        recipeCategory={recipe}
                    />
                ))}
            </Box>
            <p>Huvudingrediens</p>
            <Box>
                {recipesByCookingTime.map((recipe) => (
                    <MainIngredient
                        key={recipe._id}
                        recipeMainIngredient={recipe}
                    />
                ))}
            </Box>
            <p>Tid att laga</p>
            <Box>
                {recipesByCookingTime.map((recipe) => (
                    <CookingTime
                        key={recipe._id}
                        recipeCookingTime={recipe}
                    />
                ))}
            </Box>
            </Container>
        </Box>
        <Box
        sx={{
            display: 'grid',
            gridGap: '20px'
        }}
        >
            {recipes.map((recipe) => (
              <RecipeCard 
                  key={recipe._id}
                  recipeId={recipe._id}
                  image={recipe.image}
                  name={recipe.name}
                  description={recipe.description}
                  likes={recipe.likes}
                  onLikesIncrease={handleLikesIncrease}
              />
            ))}
        </Box>
        </>
    )
}
    
export default FilterRecipes