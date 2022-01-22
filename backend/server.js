import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise

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
    default: () => crypto.randomBytes(128).toString('hex'),
  }
})

const User = mongoose.model('User', UserSchema)

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
