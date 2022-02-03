import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Startpage from './pages/Startpage'
import Footer from './components/Footer'

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme'
import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/recept/:recipeName" element={<Recipe/>}></Route>
          <Route path="/recept/" element={<RecipeList/>}></Route>
          <Route exact path="/" element={<Startpage/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  )
}

export default App
