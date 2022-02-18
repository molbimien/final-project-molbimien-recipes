import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startpage from "./pages/Startpage";
import Footer from "./components/Footer";
import Recipe from "./pages/Recipe";
import AllRecipes from "./pages/AllRecipes";
import AddRecipe from "./pages/AddRecipe";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/recept/:recipeId/:recipeName"
            element={<Recipe />}
          ></Route>
          <Route path="/recept" element={<AllRecipes />}></Route>
          <Route exact path="/" element={<Startpage />}></Route>
          <Route exact path="/lagg-till-recept" element={<AddRecipe />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
