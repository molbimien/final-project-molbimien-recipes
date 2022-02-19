import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set("useCreateIndex", true);
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Our own middleware that checks if the database is connected before going forward to our endpoints
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// Add models for the db
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
  image: String,
  recipeCategory: String,
  recipeCookingTime: String,
  recipeMainIngredient: String,
  recipeIngredients: [
    {
      recipeIngredientAmount: String,
      recipeIngredientUnit: String,
      recipeIngredient: String,
    },
  ],
  recipeInstruction: [
    {
      instruction: Array,
    },
  ],
  datePublished: {
    type: Date,
    default: Date.now(),
  },
  source: String,
  likes: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);
const Recipe = mongoose.model("Recipe", RecipeSchema);

// authenticates user with access token
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ response: "Vänligen logga in", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.send({
    "Welcome to Molbimiens skafferi API - by Maria Sjögren (https://github.com/molbimien/). See full documentation here 👉 https://github.com/molbimien/final-project-molbimien-recipes/blob/main/Documentation.md":
      listEndpoints(app),
  });
});

// endpoint to get all recipes
app.get("/recipes", async (req, res) => {
  const recipe = await Recipe.find(req.query);
  res.json(recipe);
});

// endpoint to get the latest recipes
app.get("/recipes/latest", async (req, res) => {
  const latest = await Recipe.find(req.params.datePublished)
    .sort({ datePublished: -1 }) // -1 for descending sort
    .limit(3);

  res.json(latest);
});

// endpoint to get the most liked recipes
app.get("/recipes/liked", async (req, res) => {
  const likes = await Recipe.find(req.params.likes)
    .sort({ likes: -1 }) // -1 for descending sort
    .limit(3);

  res.json(likes);
});

// endpoint to get one recipe based on id
app.get("/recipes/id/:id", async (req, res) => {
  try {
    const recipeById = await Recipe.findById(req.params.id);
    if (!recipeById) {
      res.status(404).json({
        response: "Receptet kunde inte hittas",
        success: false,
      });
    } else {
      res.json({
        response: recipeById,
        success: true,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Detta recept-id finns inte",
    });
  }
});

// endpoint for signing up
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const salt = bcrypt.genSaltSync();

    // checks if username already exists
    if (user) {
      throw "Username not available";
    }

    // ensures the username length is minimum 2 characters
    if (username.length < 2) {
      throw "Username has to be at least 2 characters";
    }

    // ensures the password length is minimum 5 characters
    if (password.length < 5) {
      throw "Password has to be at least 5 characters";
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt), //encrypts / hashes password
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// endpoint for signing in
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    // checks if user and password matches the ones in database
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Felaktigt användarnamn eller lösenord",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// ### `POST recipes`
// End point for adding recipe
app.post("/recipes", async (req, res) => {
  const {
    name,
    description,
    image,
    recipeCategory,
    recipeCookingTime,
    recipeMainIngredient,
    recipeIngredients,
    recipeInstruction,
    source,
  } = req.body;

  try {
    const recipe = await Recipe.findOne({ name });

    //checks if name of recipe already exists
    if (recipe) {
      throw "recipe name not available";
    }

    // ensures the name of recipe length is minimum 2 characters
    if (name.length < 2) {
      throw "recipe name has to be at least 2 characters";
    }

    const newRecipe = await new Recipe({
      name,
      description,
      image,
      recipeCategory,
      recipeCookingTime,
      recipeMainIngredient,
      recipeIngredients,
      recipeInstruction,
      source,
    }).save();

    res.status(201).json({
      response: {
        recipeId: newRecipe._id,
        name: newRecipe.name,
        description: newRecipe.description,
        image: newRecipe.image,
        recipeCategory: newRecipe.recipeCategory,
        recipeCookingTime: newRecipe.recipeCookingTime,
        recipeMainIngredient: newRecipe.recipeMainIngredient,
        ingredients: newRecipe.ingredients,
        recipeInstruction: newRecipe.recipeInstruction,
        datePublished: newRecipe.datePublished,
        source: newRecipe.source,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// ### `POST recipes/:recipeId/like`
// This endpoint doesn't require a JSON body. Given a valid recipe id in the URL,
// the API should find that recipe, and update its `hearts` property to add one heart.

app.post("/recipes/:recipeId/like", async (req, res) => {
  const { recipeId } = req.params;

  try {
    const likedRecipe = await Recipe.findByIdAndUpdate(
      {
        _id: recipeId,
      },
      {
        $inc: {
          likes: 1,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ response: likedRecipe, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
