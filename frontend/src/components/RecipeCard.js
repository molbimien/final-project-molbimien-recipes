import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Box, Link, Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Favorite from "@mui/icons-material/Favorite";
import { grey } from "@mui/material/colors";

import { API_URL } from "../utils/urls";

const RecipeCard = (props) => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetch(API_URL(`recipes/id/${props.recipeId}`))
      .then((res) => res.json())
      .then((json) => {
        setRecipe(json);
      });
  }, [props.likes, props.recipeId]);

  const replaceSpecialChars = (str) => {
    return (
      str
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/([^\w]+|\s+)/g, "-") // Replace space and other characters by hyphen
        // eslint-disable-next-line
        .replace(/\-\-+/g, "-") // Replaces multiple hyphens by one hyphen
        .replace(/(^-+|-+$)/, "") // Remove extra hyphens from beginning or end of the string
        .toLowerCase()
    );
  };

  const recipeCardFont = createTheme({
    typography: {
      fontFamily: ["Charmonman"].join(","),
    },
  });

  return (
    <>
      <Box
        style={{
          position: "relative",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            aria-label="Gilla receptet"
            onClick={() => {
              props.onLikesIncrease(props.recipeId);
            }}
            sx={{
              position: "absolute",
              left: "8%",
              top: "10%",
              bgcolor: grey[50],
              color: "primary",
              "&:hover": {
                bgcolor: "#DB398D",
                color: "secondary.contrastText",
              },
              zIndex: "1",
            }}
          >
            <Favorite style={{ marginRight: "5px" }} />
            {recipe?.response?.likes}
          </Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridGap: "10px",
            boxShadow: 3,
            borderRadius: "20px",
            minWidth: "300px",
            "&:hover": {
              transition: "0.5s ease-in-out",
              transform: "scale(1.01)",
            },
          }}
        >
          <Container
            style={{
              paddingBottom: "16px",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
            <Link
              component={RouterLink}
              to={`/recept/${recipe?.response?._id}/${replaceSpecialChars(
                recipe?.response?.name
              )}`}
              sx={{
                textDecoration: "none",
              }}
            >
              <Box
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={recipe?.response?.image}
                  alt={recipe?.response?.name}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    boxSizing: "border-box",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    display: "block",
                    zIndex: "-1",
                  }}
                />
              </Box>
              <Container
                style={{
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  textAlign: "center",
                }}
              >
                <h2>
                  <Box
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {recipe?.response?.name}
                  </Box>
                </h2>
                <ThemeProvider theme={recipeCardFont}>
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      marginBlockEnd: "0.67em",
                    }}
                  >
                    "{recipe?.response?.description}"
                  </Typography>
                </ThemeProvider>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#DB398D",
                    }}
                  >
                    <AccessTimeIcon
                      color="primary"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    {recipe?.response?.recipeCookingTime}
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#DB398D",
                    }}
                  >
                    <MenuBookIcon
                      color="primary"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    {recipe?.response?.recipeCategory}
                  </Box>
                </Box>
              </Container>
            </Link>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default RecipeCard;
