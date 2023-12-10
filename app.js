const express = require("express");
const ejs=require("ejs");
const app=express();
const cors = require('cors');
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("static"));
app.use(cors({
    origin: 'http://localhost:3000', // Replace with the actual URL of your React app
    credentials: true, // Allow credentials (cookies, HTTP authentication) to be sent
  }));

  app.use(bodyParser.json());


  const sequelize = new Sequelize("userauthentication", "root", "12345678", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  });
  
  
  // Define User model
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  // Sync the models with the database
  sequelize
    .sync()
    .then(() => {
      console.log("Database and tables synced.");
    })
    .catch((error) => {
      console.error("Error syncing database:", error);
    });


    app.post("/signup", async function (req, res) {
        try {
          const { username, password } = req.body;
      
          // Create a new user in the database
          const newUser = await User.create({ username, password });
      
          console.log("User created:", newUser);
          res.send("Signup Successful!");
        } catch (error) {
          console.error("Error creating user:", error);
          res.status(500).send("Internal Server Error");
        }
      });


      app.post("/login", async function (req, res) {
        try {
          const { username, password } = req.body;
      
          // Find the user in the database
          const foundUser = await User.findOne({
            where: { username, password },
          });
      
          if (foundUser) {
            console.log("Login Successful:", foundUser);
            res.send("Login Successful!");
          } else {
            console.log("Incorrect credentials");
            res.status(401).send("Incorrect credentials");
          }
        } catch (error) {
          console.error("Error during login:", error);
          res.status(500).send("Internal Server Error");
        }
      });



















app.listen(4000,function(req,res){
console.log("server started on port 4000")
})

