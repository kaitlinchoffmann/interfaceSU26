require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

const userRoutes = require("./server/routes/user")

mongoose.connect(process.env.dbURL)
  .then(() => console.log("DB Connected!!"))
  .catch(error => console.log(error));

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use('/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))

/*
    Example: To call our getUsers function in our user.js model file, we first
    include the domain name or port number if using local host:
    http://localhost:5000/

    Next, include the appropriate url from app.use above. For user routes, we 
    will user /users since: app.use('/users', userRoutes)
    http://localhost:5000/users

    Last, call the appropriate route in the user.js route file. Place in browser 
    url if a GET request, otherwise, use Postman:
    http://localhost:5000/users/
*/