const mongoose = require('mongoose');


const IdeaSchema=new mongoose.Schema({
  text:{
    type: String,
    required: [true, 'Please add a text field'] //custom error message
  },
  tag:{
    type: String
  },
  username:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  }
})

const Idea= mongoose.model('Idea',IdeaSchema)

module.exports=Idea;


