import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Box, Link } from "@mui/material";
import LatestRecipesList from "../components/LatestRecipesList";
import MostLikedRecipesList from "../components/MostLikedRecipesList";
import Header from "../components/Header";

const Startpage = () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          display: "grid",
          gridGap: "10px",
          marginBottom: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Senaste recepten</h2>
          <Link component={RouterLink} to="/recept">
            Se alla recept
          </Link>
        </Box>
        <LatestRecipesList />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Populära recept</h2>
        </Box>
        <MostLikedRecipesList />
      </Container>
    </>
  );
};

export default Startpage;
