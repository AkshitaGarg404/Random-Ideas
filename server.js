require('dotenv').config();

const connectDB=require('./config/db.js')
connectDB();
const path = require('path');

const express = require('express');
const cors = require('cors');
const port=process.env.PORT || 5000;

const app=express()

//static folder for html and css
app.use(express.static(path.join(__dirname,'public')))

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//cors middleware
  //app.use(cors()) //also valid and it allows us to make a request from anywhere
app.use(cors({
  //adding origin property which is an array of urls that allow us to make a request from
  origin:["http://localhost:3000","http://localhost:5500"],
  credentials:true
}))

app.get('/',(req,res)=>{
  res.send("Welcome to random ideas app")
})



///api/ideas route set up
const ideasRouter=require('./routes/ideas') //no need to destructure for a single export
app.use('/api/ideas',ideasRouter)

app.listen(port,()=>{
  console.log(`Server is listening on port ${port}`)
})