import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import RecipeCard from "./RecipeCard";

import { API_URL } from "../utils/urls";

const LatestRecipesList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch(API_URL("recipes/latest"))
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

  return (
    <Box
      sx={{
        display: {
          xs: "flex",
          ls: "grid",
        },
        overflowX: {
          xs: "scroll",
        },
        gridTemplateColumns: {
          lg: "1fr 1fr 1fr", // theme.breakpoints.up('lg')
        },
        gap: "20px",
        paddingLeft: "4px",
        paddingBottom: "10px",
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
  );
};

export default LatestRecipesList;
