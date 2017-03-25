'use strict';

const express = require("express");

const app = express();

//middleware is function that is placed between a request and a response. It takes three arguments
// req, res, and next that are global objects to the module

const requestTime = (req, res, next) => {
  req.requestedTime = Date.now();
  next();
}


// telling express I am going to use a middleware function. Pass in the middleware function
app.use(requestTime)


app.use(express.static(__dirname + "/public"));

app.use(requestTime);

app.get("/monkeys", (req, res, next)=>{
  console.log("Looking at monks");
  console.log(`This ran at ${req.resquestedTime}`);
  //send file method
  res.sendFile(__dirname + "/public/monkeys.html");
});

app.get("/chickens", (req, res, next)=>{
  console.log("Looking for chickens");
  //send the file and completes the process and closes the get
  res.send(`<h3>No chickens for you</h3><form method="POST"><input type="text"><button type="submit">push</button></form>`);
})

app.post("/chickens", (req, res, next)=>{
  console.log("Posting a form for chickens");
})

//This occurs when you have selected the wrong path
app.use((req, res, next)=>{
  res.send("Where do you think you're going? We only have monkeys and chickens here");
})



app.listen(3000, ()=>{
  console.log("Server listening on 3000");
})
