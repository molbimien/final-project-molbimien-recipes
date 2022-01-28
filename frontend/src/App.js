import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipeList from './RecipeList'
import Recipe from './Recipe'
import Header from './Header'
import Footer from './Footer'

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<RecipeList/>}></Route>
          <Route path="/recept/:recipeName" element={<Recipe/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  )
}

export default App
