import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Container, Box, TextField, Select, FormControl, InputLabel, MenuItem, Link, Button } from '@mui/material'
import { grey } from '@mui/material/colors'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { API_URL } from "../utils/urls"

const AddRecipe = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [recipeCategory, setRecipeCategory] = useState("")
  const [recipeCookingTime, setRecipeCookingTime] = useState("")
  const [recipeMainIngredient, setRecipeMainIngredient] = useState("")
  const [recipeIngredients, setRecipeIngredients] = useState(
    [{ 
      recipeIngredientAmount: "",
      recipeIngredientUnit: "",
      recipeIngredient: "",
    }]
    )
  const [recipeInstruction, setRecipeInstruction] = useState([{ instruction: "" }])
  const [source, setSource] = useState("")
  // eslint-disable-next-line
  const [message, setMessage] = useState("")

  const categories = ["Förrätt", "Huvudrätt", "Efterrätt", "Tillbehör"]
  const cookingTimes = ["< 15 min", "< 30 min", "< 45 min", "> 60 min"]
  const mainIngredients = ["kyckling", "nötkött", "fläsk", "fisk", "ost", "grönsaker", "ägg"]

  const handleAddRecipeSubmit = async (e) => {
    e.preventDefault()
    try { 
      let res = await fetch(API_URL('recipes'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          name,
          description,
          image,
          recipeCategory,
          recipeCookingTime,
          recipeMainIngredient,
          recipeIngredients,
          recipeInstruction,
          source,
        }),
    })
    
    // eslint-disable-next-line
    let resJson = await res.json()
      if (res.status === 200 || 201) {
        setName("")
        setDescription("")
        setImage("")
        setRecipeCategory("")
        setRecipeCookingTime("")
        setRecipeMainIngredient("")
        setRecipeIngredients([{ 
          recipeIngredientAmount: "",
          recipeIngredientUnit: "",
          recipeIngredient: "",
        }])
        setRecipeInstruction([{ instruction: "" }])
        setSource("")
        setMessage("Recipe created successfully")
      } else {
        setMessage("Some error occured")
        console.log(res.status)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...recipeIngredients];
    list[index][name] = value;
    setRecipeIngredients(list);
  };

  const handleIngredientAdd = () => {
    setRecipeIngredients([
      ...recipeIngredients,
      {
        recipeIngredientAmount: "",
        recipeIngredientUnit: "",
        recipeIngredient: "",
      }
    ]);
  };

  const handleIngredientRemove = (index) => {
    const list = [...recipeIngredients];
    list.splice(index, 1);
    setRecipeIngredients(list);
  };

  const handleInstructionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...recipeInstruction];
    list[index][name] = value;
    setRecipeInstruction(list);
  };

  const handleInstructionRemove = (index) => {
    const list = [...recipeInstruction];
    list.splice(index, 1);
    setRecipeInstruction(list);
  };

  const handleInstructionAdd = () => {
    setRecipeInstruction([...recipeInstruction, { instruction: "" }]);
  };
  
  return (
    <>
      <Container>
        <Box
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', 
          }}
        >
        <Link component={RouterLink}
          to="/"
        >
          <ArrowBackIosIcon
            sx={{
              padding: '9px',
            }}
          />
        </Link>
        </Box>
      </Container>
      <Box
        sx={{
          bgcolor: 'primary.main',
        }}   
      >
        <Box
          sx={{
            padding: '20px',
          }}   
        >
        </Box>
        <Container
          sx={{
            bgcolor: grey[50],
            display: 'grid',
            justifyItems: 'center',
            borderRadius: '4px',
            maxWidth: {
              xs: '75vw', // theme.breakpoints.up('xs')
              lg: '60vw', // theme.breakpoints.up('lg')
            },
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <h1>Lägg till ett recept</h1>
          </Box>
          <Box
            component="form"
            sx={{
                '& > :not(style)': { 
                  m: {
                    xs: 1,
                    md: 2,
                    lg: 3,
                    },
                  width: {
                    xs: '25ch',
                    md: '40ch',
                    lg: '60ch',
                  }
                },
                display: 'grid',
                justifyItems: 'center',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleAddRecipeSubmit}
          >
            <TextField
            fullWidth
            required
            id='name'
            label="Receptets namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <TextField
            fullWidth
            // required
            id='description'
            label='En kort beskrivning'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
            fullWidth
            // required
            id='image'
            label='Bild'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            />
            {/* <FormControl fullWidth required> */}
            <FormControl fullWidth>
            <InputLabel>Välj kategori</InputLabel>
              <Select 
                label="Välj kategori" 
                value={recipeCategory ?? ""}
                onChange={(e) => setRecipeCategory(e.target.value)}
                >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl fullWidth required> */}
            <FormControl fullWidth >
            <InputLabel>Välj tillagningstid</InputLabel>
              <Select 
                label="Välj tillagningstid" 
                value={recipeCookingTime ?? ""}
                onChange={(e) => setRecipeCookingTime(e.target.value)}
                >
                {cookingTimes.map((cookingTime, index) => (
                  <MenuItem key={index} value={cookingTime}>
                    {cookingTime}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl fullWidth required> */}
            <FormControl fullWidth >
            <InputLabel>Välj huvudingrediens</InputLabel>
              <Select 
                label="Välj huvudingrediens" 
                value={recipeMainIngredient ?? ""}
                onChange={(e) => setRecipeMainIngredient(e.target.value)}
                >
                {mainIngredients.map((cookingTime, index) => (
                  <MenuItem key={index} value={cookingTime}>
                    {cookingTime}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
                {recipeIngredients.map((ingredient, index) => (
                  <Box key={index}>
                    <TextField
                      fullWidth
                      // required
                      label='Mängd'
                      name="recipeIngredientAmount"
                      value={ingredient.recipeIngredientAmount}
                      onChange={(e) => handleIngredientChange(e, index)}
                    />
                    <TextField
                      fullWidth
                      // required
                      label='Måttenhet'
                      name="recipeIngredientUnit"
                      value={ingredient.recipeIngredientUnit}
                      onChange={(e) => handleIngredientChange(e, index)}
                    />
                    <TextField
                      fullWidth
                      required
                      name="recipeIngredient"
                      label='Ingrediens'
                      value={ingredient.recipeIngredient}
                      onChange={(e) => handleIngredientChange(e, index)}
                    />
                    {recipeIngredients.length - 1 === index && recipeIngredients.length < 4 && (
                    <Button
                      onClick={handleIngredientAdd}
                    >
                      Lägg till ingrediens
                    </Button>
                  )}
                
                  {recipeIngredients.length !== 1 && (
                    <Button
                      onClick={() => handleIngredientRemove(index)}
                    >
                      Ta bort ingrediens
                    </Button>
                  )}
                </Box>
            ))}
            {recipeInstruction.map((singleInstruction, index) => (
              <Box key={index}>
                  <TextField
                    name="instruction"
                    id="instruction"
                    label='Instruktion'
                    value={singleInstruction.instruction}
                    onChange={(e) => handleInstructionChange(e, index)}
                  />
                  {recipeInstruction.length - 1 === index && recipeInstruction.length < 4 && (
                    <Button
                      onClick={handleInstructionAdd}
                    >
                      Lägg till instruktion
                    </Button>
                  )}
                
                  {recipeInstruction.length !== 1 && (
                    <Button
                      onClick={() => handleInstructionRemove(index)}
                    >
                      Ta bort instruktion
                    </Button>
                  )}
              </Box>
            ))}
            <TextField
              fullWidth
              label='Källa'
              type="text"
              value={source}
              placeholder="Källa"
              onChange={(e) => setSource(e.target.value)}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center', 
                paddingTop: '20px',
              }}
            >
            <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '4px',
                  bgcolor: grey[900],
                }}   
            >
                Lägg till recept
            </Button>
            </Box>
            {message ? <p>{message}</p> : null}
          </Box>
          <Box
            sx={{ 
              padding: '20px',
            }}   
          >
          </Box>
          <Box
            sx={{
              bgcolor: 'primary.main',
              padding: '20px',
              width: '120%',
            }}   
          >
          </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default AddRecipe