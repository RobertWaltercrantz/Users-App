const { Sequelize, Model, DataTypes } = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Define User model
class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    car: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

// Sync models with database
sequelize.sync();

const users = [
  { name: "Jenna Ortega", isAdmin: false, car: "Volvo S60" },
  { name: "Kristen Bell", isAdmin: false, car: "Toyota Prius" },
  { name: "Cate Blanchett", isAdmin: false, car: "Ferrari Testarossa" },
  { name: "Uma Thurman", isAdmin: false, car: "Polestar 4" },
  { name: "Margot Robbie", isAdmin: false, car: "Porsche 911" },
];

// imports the express npm module
const express = require("express");
// imports the cors npm module
const cors = require("cors");
// Creates a new instance of express for our app
const app = express();

//AUTH0
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const jwtCheck = auth({
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuerBaseURL: process.env.REACT_APP_AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});
//END AUTH0

// .use is middleware - something that occurs between the request and response cycle.
app.use(cors());
// We will be using JSON objects to communicate with our backend, no HTML pages.
app.use(express.json());
// This will serve the React build when we deploy our app
app.use(express.static("react-frontend/dist"));

// AUTH0 Enforce on all endpoints
//app.use(jwtCheck);

// Create users - ONLY DO THIS ONCE USING A BROWSER !!!
// http://localhost:8080/api/seeds
app.get("/api/seeds", async (req, res) => {
  users.forEach((user) => User.create(user));
  res.json(users);
});

// This route will return 'Hello IKEA' when you go to localhost:8080/ in the browser
app.get("/", (req, res) => {
  res.json({ data: "Hello IKEA" });
});

// Show all users
app.get("/api/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Show user using id
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

// Create user(s)
app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  const { name, isAdmin } = req.body;
  const user = await User.findByPk(req.params.id);
  await user.update({ name, isAdmin });
  await user.save();
  res.json(user);
});

// Delete user by id
app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json({ data: `The user with id of ${req.params.id} is removed.` });
});

// This tells the express application to listen for requests on port 8080
const port = process.env.PORT || 8080;
server = app.listen(port, async () => {
  console.log(`Server started at ${port}`);
});

module.exports = {app, server} // this is so we can stop the server programmatically 