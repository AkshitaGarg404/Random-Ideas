//import IdeasApi for backend
import IdeasApi from "../services/ideasApi";
//import Idealist for UI
import IdeaList from "./IdeaList";

class IdeaForm{
  constructor(){
    this._formModal=document.querySelector('#form-modal')
    this.ideaList=new IdeaList()
  }

  //we want to create the entire form from our js
  //similar to react where we have a render that outputs the html
  render(){
    this._formModal.innerHTML=`
    <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${localStorage.getItem('username')|| ''}" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>
    `
    //added them here instead of constructor because we can access #idea-form only after form html is rendered
    this._form=document.querySelector('#idea-form')
    this.addEventListeners();
  }

  //async because of axios.post
  async handleSubmit(e){
    e.preventDefault();
    //create an idea object to send as req
    if(!this._form.elements.text.value||!this._form.elements.tag.value||!this._form.elements.username.value){
      alert("Please Enter all fields.");
      return;
    }

    //save user to localStorage;
    localStorage.setItem('username', this._form.elements.username.value)




    const idea={
      text:this._form.elements.text.value,
      tag:this._form.elements.tag.value,
      username:this._form.elements.username.value,
    } //this idea is the data we need to send to backend

    //add idea to server
    const newIdea=await IdeasApi.createIdea(idea);

    //add idea to list
    // IdeaList.addIdeaToList(newIdea) //we can't do this directly we have to create and instance first.. do in constructor()
    this.ideaList.addIdeaToList(newIdea.data.data)
    //here newIdea.data has whole object that is returned and newIdea.data.data has the newly created idea 


    //now when we submit we want to clear all fields and close the modal and for that we need access to modals that are in entirely different folders.. 
    //thus to handle this, we can send a custom event Listener and listen for that event in modal and if that event is listened the modal closes due to addEventListener for that custom event

    //clear fields
    this._form.elements.text.value=''
    this._form.elements.tag.value=''
    this._form.elements.username.value=''

    //render modal again
    this.render()
    //for modal.. we will dispatch a custom event using dispatchEvent() method on the document object
      //const myEvent = new Event("customEvent"); // Create a custom event
      // document.dispatchEvent(myEvent);  // Dispatch(trigger) it
    

    document.dispatchEvent(new Event('closemodal'))
    //dispatch event means that the custom event is triggered ... and now we can listen for it anywhere
    //now listen for this event in our modal components: and this event is heard on document
  }

  //add event listener for submit
  addEventListeners(){
    this._form.addEventListener('submit',this.handleSubmit.bind(this))
  }
}

export default IdeaForm;