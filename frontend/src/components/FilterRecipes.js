import React, { useEffect, useState }  from 'react'
import { Box, Button, Container } from '@mui/material'
import RecipeCard from './RecipeCard';
import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { API_URL } from '../utils/urls'

const FilterRecipes = () => {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetchRecipes() // Fetch recipes with likes when component is mounted
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
                <Button 
                    variant="outlined"
                    size="small"
                >
                    Testknapp
                </Button>
            </Box>
            <p>Huvudingrediens</p>
            <Box>
                <Button 
                    variant="outlined"
                    size="small"
                >
                    Testknapp
                </Button>
            </Box>
            <p>Tid att laga</p>
            <Box>
                <Button 
                    variant="outlined"
                    size="small"
                >
                    Testknapp
                </Button>
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