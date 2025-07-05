//import fontawesome
//import css
import './css/style.css'


//in components/Modal.js
// //get the modal: id for form
// const modal=document.querySelector('#modal')
// //Get the modal icon: the plus
// const modalBtn=document.querySelector('#modal-btn')

// //now initially the modal class has display:none; to unhide it set display:block
// function open(){
//   modal.style.setProperty('display','block')
// }

// //when modalBtn is clicked.. it calls open() function
// modalBtn.addEventListener('click',open)

// //if user clicks anywhere outside the overlay.. it should close
// function close(){
//   modal.style.display='none'
// }

// function outsideClick(e){
//   if(e.target===modal){
//     close();
//   }
// }

// window.addEventListener('click',outsideClick)

//handling modal
//import Modal
import Modal from './components/Modal.js'

//instantiate it and automatically the constructor is called and our work is done
new Modal();

//creating form: IdeaForm component
import IdeaForm from './components/IdeaForm.js';
const ideaform=new IdeaForm();
ideaform.render();

//now handle form submission: go to ideaForm handlesubmit

//IdeaList component: the UI part where all ideas are
import IdeaList from './components/IdeaList.js';
new IdeaList();



//now api service that gets us ideas from backend
//create a class that deals with reaching out to our api
// services/ideasApi.js
//install axios
//then i created ideasApi get Ideas() that simply returned axios.get which is a promise and we created a getIdeas() function in ideaList to initialise ideas array

//when i ran this... it gave an error
//Access to XMLHttpRequest at 'http://localhost:5500/api/ideas' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

// This error is a CORS (Cross-Origin Resource Sharing) error

//  What It Means:
    // You are trying to make an HTTP request from:
    // A webpage running on http://localhost:3000 (probably your frontend – like React, Vite, or similar)
    // To a backend API running at:
    // http://localhost:5500/api/ideas
    // BUT the browser blocks this request because the two are on different ports (3000 vs. 5500), which counts as different origins.

    // CORS is a security feature enforced by browsers to prevent websites from making requests to a different domain (or port or protocol) unless explicitly allowed by the server.

//solution
  // If you’re using Express.js on the backend: in app folder
      // Install the CORS middleware:
      // npm install cors
  // Use it in your Express app: server.js
      // const express = require('express');
      // const cors = require('cors');
  //add cors middleware to server.js

  // why is cors added to backend
      // CORS is added to the backend because browsers enforce security rules that block cross-origin HTTP requests unless the backend explicitly allows them.

  //then i simply called ideasapi getideas in idealists getideas and the called render for ui


//now adding a new idea from form
  //in ideasApi call axios.post
  //in ideasForm .. create data object and call axios vla methods
  //now new idea is added to db
  //create addIdea function in ideaList for UI

//now add username to local storage
//in ideaform while rendering make value of username = this localstorage username

//now in backend route/Idea.js ... add a username validation for delete


