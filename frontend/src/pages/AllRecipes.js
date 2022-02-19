import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import Lottie from "lottie-react";
import cookingAnimation from "../utils/75783-prepare-food.json";
import Header from "../components/Header";
import FilterRecipes from "../components/FilterRecipes";

const AllRecipes = () => {
  const [loading, setloading] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setloading(true);
    }, 1000);
  }, []);

  return (
    <>
      <Header />
      <Container
        sx={{
          textAlign: {
            md: "center", 
          },
        }}
      >
        <h1>Alla recept</h1>
      </Container>
      {!loading ? (
        <Box
          sx={{
            maxWidth: "300px",
            margin: "auto",
            paddingBottom: "600px",
          }}
        >
          <Lottie animationData={cookingAnimation} loop={true} />
        </Box>
      ) : (
        <FilterRecipes />
      )}
    </>
  );
};

export default AllRecipes;
