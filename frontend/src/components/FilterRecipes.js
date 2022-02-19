import React, { useEffect, useState } from "react";
import { Box, Container, Link } from "@mui/material";
import RecipeCard from "./RecipeCard";
import Category from "./Category";
import CookingTime from "./CookingTime";
import MainIngredient from "./MainIngredient";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { API_URL } from "../utils/urls";

const FilterRecipes = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch(API_URL("recipes"))
      .then((res) => res.json())
      .then((json) => {
        setRecipes(json);
      });
  };

  const handleLikesIncrease = (recipeId) => {
    const options = {
      method: "POST",
    };

    fetch(API_URL(`recipes/${recipeId}/like`), options)
      .then((res) => res.json())
      .then((json) => {
        fetchRecipes(json);
      });
  };

  const recipesByCategory = [];
  recipes.forEach((recipe) => {
    if (!recipesByCategory.includes(recipe.recipeCategory)) {
      recipesByCategory.push(recipe.recipeCategory);
    }
  });

  const recipesByMainIngredient = [];
  recipes.forEach((recipe) => {
    if (!recipesByMainIngredient.includes(recipe.recipeMainIngredient)) {
      recipesByMainIngredient.push(recipe.recipeMainIngredient);
    }
  });

  const recipesByCookingTime = [];
  recipes.forEach((recipe) => {
    if (!recipesByCookingTime.includes(recipe.recipeCookingTime)) {
      recipesByCookingTime.push(recipe.recipeCookingTime);
    }
  });

  const handleCategoryFilterClick = (recipeCategory) => {
    fetch(API_URL(`recipes/?recipeCategory=${recipeCategory}`))
      .then((res) => res.json())
      .then((json) => {
        setRecipes(json);
      });
  };

  const handleMainIngredientFilterClick = (recipeMainIngredient) => {
    fetch(API_URL(`recipes/?recipeMainIngredient=${recipeMainIngredient}`))
      .then((res) => res.json())
      .then((json) => {
        setRecipes(json);
      });
  };

  const handleRecipeCookingTimeFilterClick = (recipeCookingTime) => {
    fetch(API_URL(`recipes/?recipeCookingTime=${recipeCookingTime}`))
      .then((res) => res.json())
      .then((json) => {
        setRecipes(json);
      });
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#eeeeee",
          paddingBottom: "16px",
          marginBottom: "20px",
        }}
      >
        <Container>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>filtrera listan</p>
            <FilterAltIcon />
          </Box>
          <Box
            sx={{
              display: {
                md: "flex", 
              },
              justifyContent: {
                md: "space-around", 
              },
            }}
          >
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <p>Typ av rätt</p>
              <Box>
                {recipesByCategory.map((recipe) => (
                  <Category
                    key={recipe}
                    recipeCategory={recipe}
                    onCategoryFilterClick={handleCategoryFilterClick}
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <p>Huvudingrediens</p>
              <Box>
                {recipesByMainIngredient.map((recipe) => (
                  <MainIngredient
                    key={recipe}
                    recipeMainIngredient={recipe}
                    onMainIngredientFilterClick={
                      handleMainIngredientFilterClick
                    }
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <p>Tid att laga</p>
              <Box>
                {recipesByCookingTime.map((recipe) => (
                  <CookingTime
                    key={recipe}
                    recipeCookingTime={recipe}
                    onRecipeCookingTimeFilterClick={
                      handleRecipeCookingTimeFilterClick
                    }
                  />
                ))}
              </Box>
            </Box>
          </Box>
          <Box>
            <Link
              href="#"
              onClick={() => {
                fetchRecipes();
              }}
              sx={{
                textAlign: "center",
              }}
            >
              <p>Rensa filter</p>
            </Link>
          </Box>
        </Container>
      </Box>
      <Container
        sx={{
          marginBottom: "50px",
          maxWidth: {
            lg: "none", 
          },
        }}
      >
        
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              md: "1fr 1fr", 
              lg: "1fr 1fr 1fr 1fr", 
            },
            gridGap: "20px",
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
        
      </Container>
    </>
  );
};

export default FilterRecipes;
