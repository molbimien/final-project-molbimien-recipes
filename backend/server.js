import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

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

// authenticates user with access token
const authenticateUser = async (req, res, next) => {
	const accessToken = req.header("Authorization");

	try {
		const user = await User.findOne({ accessToken });
		if (user) {
			next();
		} else {
			res.status(401).json({ response: "Please log in", success: false });
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
};

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

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
				response: "Username or password doesn't match",
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({ response: error, success: false });
	}
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
