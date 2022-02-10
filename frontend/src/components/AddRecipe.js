
import { useState } from "react"
import { Container, Box, TextField, Button } from '@mui/material'

import { API_URL } from "../utils/urls"

const AddRecipe = () => {

const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [image, setImage] = useState("")
const [recipeCategory, setRecipeCategory] = useState("")
const [recipeCookingTime, setRecipeCookingTime] = useState("")
const [recipeMainIngredient, setRecipeMainIngredient] = useState("")
// const [recipeMainIngredient, setrecipeMainIngredient] = useState("")
const [recipeInstruction, setRecipeInstruction] = useState([])
const [source, setSource] = useState("")
const [message, setMessage] = useState("")

let handleAddRecipeSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await fetch(API_URL('recipes'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name: name,
                description: description,
                image: image,
                recipeCategory: recipeCategory,
                recipeCookingTime: recipeCookingTime,
                recipeMainIngredient: recipeMainIngredient,
                // recipeMainIngredient: recipeMainIngredient,
                recipeInstruction: recipeInstruction,
                source: setSource,
      }),
    })
    
    // eslint-disable-next-line
    let resJson = await res.json()
      if (res.status === 200 | 201 | 204) {
        setName("")
        setDescription("")
        setImage("")
        setRecipeCategory("")
        setRecipeCookingTime("")
        setRecipeMainIngredient("")
        // setrecipeMainIngredient("")
        setRecipeInstruction("")
        setSource("")
        setMessage("Recipe created successfully")
      } else {
        setMessage("Some error occured")
      }
    } catch (err) {
      console.log(err)
    }
  }
  
return (
    <Container
      sx={{
        display: 'grid',
        justifyItems: 'center',
      }}
    >
      <Box>
        <h1>Lägg till ett recept</h1>
      </Box>
      <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            display: 'grid',
            justifyItems: 'center',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleAddRecipeSubmit}
      >
        <TextField
        type="text"
        value={name}
        placeholder="Receptets namn"
        onChange={(e) => setName(e.target.value)}
        />
        <TextField
        type="text"
        value={description}
        placeholder="En kort beskrivning"
        onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
        type="text"
        value={image}
        placeholder="Bild"
        onChange={(e) => setImage(e.target.value)}
        />
        <TextField
        type="text"
        value={recipeCategory}
        placeholder="Kategori"
        onChange={(e) => setRecipeCategory(e.target.value)}
        />
        <TextField
        type="text"
        value={recipeCookingTime}
        placeholder="Tid att laga"
        onChange={(e) => setRecipeCookingTime(e.target.value)}
        />
        <TextField
        type="text"
        value={recipeMainIngredient}
        placeholder="Huvudingrediens"
        onChange={(e) => setRecipeMainIngredient(e.target.value)}
        />
        {/* <input
        type="text"
        value={recipeMainIngredient}
        placeholder="Tid att laga"
        onChange={(e) => setRecipeMainIngredient(e.target.value)}
        /> */}
        <TextField
        type="textarea"
        value={recipeInstruction}
        placeholder="Instruktion"
        onChange={(e) => setRecipeInstruction(e.target.value)}
        />
        <TextField
        type="text"
        value={source}
        placeholder="Källa"
        onChange={(e) => setSource(e.target.value)}
        />

        <Button
            type="submit"
            variant="contained"
        >
            Lägg till
        </Button>

        <Box>{message ? <p>{message}</p> : null}</Box>
        </Box>
    </Container>
  )
}

export default AddRecipe