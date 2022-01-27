import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipeList from './RecipeList'
import Recipe from './Recipe'
import Header from './Header'
import Footer from './Footer'

const App = () => {
  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<RecipeList/>}></Route>
        <Route path="/recept/:recipeName/:recipeId" element={<Recipe/>}></Route>
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  )
}

export default App
