const express = require('express');
const router=express.Router()
const Idea=require('../models/Idea.js')


//get all
router.get('/',async(req,res)=>{ 
  try {
    const ideas=await Idea.find()
    res.json({success:true, data:ideas});
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, error:"Something went wrong"})
  }
})

//get one
router.get('/:ideaId',async(req,res)=>{
  const {ideaId}=req.params
  try {
    const idea=await Idea.findById(ideaId);
    if(!idea){
      return res.status(404).json({success:false, error:"Resource Not Found"})
    }
    res.json({success:true,data:idea});
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, error:"Something went wrong"}) 
  }
})


//post
router.post('/',async(req,res)=>{
  const idea= new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  })

  try {
    const savedIdea=await idea.save()
    res.status(201).json({succes:true, data:savedIdea})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, error:"Something went wrong"})
  }
})

//put
router.put('/:ideaId',async(req,res)=>{
  const {ideaId}= req.params
  try{
    //adding username validation
    const idea= await Idea.findById(ideaId)
    //match the username
    if(idea.username===req.body.username){ //we will send username with req body
      const updatedIdea=await Idea.findByIdAndUpdate(ideaId,{
        $set: {
          text: req.body.text, 
          tag:  req.body.tag
        }
      },
      { new:true })
      return res.json({success:true,data:updatedIdea})
    }else{
      return res.status(403).json({success:false, error:"User not authorised to update this resource"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,error:"Something went wrong"})
  }
})


//delete::splice
router.delete('/:ideaId',async(req,res)=>{
  const {ideaId}= req.params
  try{
    //adding username validation
    const idea= await Idea.findById(ideaId)
    //match the username
    if(idea.username===req.body.username){ //we will send username with req body
      const deletedIdea=await Idea.findByIdAndDelete(ideaId)
      return  res.json({success:true,data:deletedIdea});
    }else{
      return res.status(403).json({success:false, error:"User not authorised to update this resource"})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,error:"Something went wrong"})
  }
})

module.exports=router