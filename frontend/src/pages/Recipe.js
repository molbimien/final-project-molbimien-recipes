import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Checkbox,
  Link,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Favorite from "@mui/icons-material/Favorite";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { grey } from "@mui/material/colors";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { API_URL } from "../utils/urls";

const label = { inputProps: { "aria-label": "Instruktion" } };

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);

  const { recipeId } = useParams();

  useEffect(() => {
    fetch(API_URL(`recipes/id/${recipeId}`))
      .then((res) => res.json())
      .then((json) => {
        setRecipe(json);
      });
  }, [recipeId]);

  const handleLikesClick = (recipeId) => {
    const options = {
      method: "POST",
    };

    fetch(API_URL(`recipes/${recipeId}/like`), options)
      .then((res) => res.json())
      .then((json) => {
        setRecipe(json);
      });
  };

  const recipeFont = createTheme({
    typography: {
      fontFamily: ["Charmonman"].join(","),
    },
  });

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "42px",
          }}
        >
          <Link component={RouterLink} to="/" aria-label="Gå tillbaka">
            <ArrowBackIosIcon color="primary" />
          </Link>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              postion: "absolute",
            }}
          >
            <Button
              size="small"
              aria-label="Gilla receptet"
              onClick={() => {
                handleLikesClick(recipeId);
              }}
            >
              <Favorite
                color="primary"
                style={{
                  marginRight: "5px",
                }}
              />
              {recipe?.response?.likes}
            </Button>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          height: "400px",
          overflow: "hidden",
        }}
      >
        <img
          src={recipe?.response?.image}
          alt={recipe?.response?.name}
          style={{
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Container
        sx={{
          marginBottom: "50px",
        }}
      >
        <Box
          sx={{
            textAlign: {
              md: "center", 
            },
            paddingTop: {
              md: "20px", 
            },
          }}
        >
          <h1>{recipe?.response?.name}</h1>
          <ThemeProvider theme={recipeFont}>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                marginBlockStart: {
                  xs: "20px", 
                  md: "30px", 
                },
                marginBlockEnd: {
                  xs: "20px", 
                  md: "30px", 
                },
              }}
            >
              "{recipe?.response?.description}"
            </Typography>
          </ThemeProvider>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "space-around",
                md: "center", 
              },
              gap: {
                md: "30px", 
              },
              paddingBottom: {
                md: "0", 
              },
              marginBottom: {
                xs: "30px", 
                md: "0", 
              },
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                color: "#DB398D",
              }}
            >
              <AccessTimeIcon color="primary" style={{ marginRight: "5px" }} />{" "}
              {recipe?.response?.recipeCookingTime}
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                color: "#DB398D",
              }}
            >
              <MenuBookIcon color="primary" style={{ marginRight: "5px" }} />{" "}
              {recipe?.response?.recipeCategory}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingBottom: {
              md: "100px", 
            },
            display: {
              md: "grid", 
            },
            gridTemplateColumns: {
              md: "1fr 2fr", 
            },
            gap: {
              md: "30px", 
            },
          }}
        >
          <Box
            sx={{
              bgcolor: grey[100],
              float: {
                md: "left", 
              },
              padding: {
                xs: "15px 20px 5px", 
                md: "30px 35px 35px", 
              },
              borderBottomRightRadius: {
                xs: "20px", 
                md: "20px", 
              },
            }}
          >
            <h2>Ingredienser</h2>
            <div>
              {recipe?.response?.recipeIngredients.map(
                (recipeIngredients, index) => {
                  return (
                    <p key={index}>
                      {recipeIngredients.recipeIngredientAmount}{" "}
                      {recipeIngredients.recipeIngredientUnit}{" "}
                      {recipeIngredients.recipeIngredient}
                    </p>
                  );
                }
              )}
            </div>
          </Box>
          <Box
            sx={{
              paddingTop: {
                md: "30px", 
              },
            }}
          >
            <h2>Gör så här</h2>
            <div>
              {recipe?.response?.recipeInstruction?.map(
                (recipeInstruction, index) => {
                  return (
                    <li
                      key={index}
                      style={{
                        listStyleType: "none",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #f5f5f5",
                        padding: "0 0 24px 0",
                        marginTop: "24px",
                      }}
                    >
                      <Checkbox
                        {...label}
                        icon={
                          <CheckBoxOutlineBlankIcon
                            color="primary"
                            fontSize="large"
                          />
                        }
                        checkedIcon={
                          <CheckBoxIcon color="primary" fontSize="large" />
                        }
                      />
                      <div>{recipeInstruction.instruction}</div>
                    </li>
                  );
                }
              )}
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Recipe;
