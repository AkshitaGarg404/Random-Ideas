//import IdeasApi
import IdeasApi from "../services/ideasApi";

class IdeaList{
  constructor(){
    this._ideaListEl=document.querySelector('#idea-list');
    //fetch these ideas from db
    this._ideas=[]
    this.getIdeas()
    this._validTags=new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }
  //getIdeas.. to initialise ideas array: because from the api we are returning axios.get and that returns a promise
  async getIdeas(){
    try {
      const res= await IdeasApi.getIdeas()
      //res.data.data because res.data has entire object: {success:true,data:ideas}.. so we have to get only the data from this object
      this._ideas=res.data.data;
      this.render();
    } catch (error) {
      console.log(error)
    }
  }

  //add idea UI
  addIdeaToList(idea){
    this._ideas.push(idea);
    this.render();
  }

  //method to get tag class
  getTagClass(tag){
    tag=tag.toLowerCase();
    let tagClass=''
    if(this._validTags.has(tag)){
      tagClass=`tag-${tag}`
    } else {
      tagClass=''
    }
    return tagClass;
  }

  //delete Idea
  async deleteIdea(ideaId){
    try {
      //delete from server
      const res=await IdeasApi.deleteIdea(ideaId);

      //delete from dom
      this._ideas.filter((idea)=> idea._id!==ideaId)
      this.getIdeas();
    } catch (error) {
      alert("You cannot delete this resource");
    }
  }

  //create a card for each idea from ideas array... 
  //use array.map to create each card and then push it in innerHTML
  render(){
    this._ideaListEl.innerHTML=this._ideas.map((idea)=>{
      const tagClass=this.getTagClass(idea.tag)
      //add a custom attribute data-id to each card

      //checking if delete btn shpuld show or not
      const deleteBtn=idea.username===localStorage.getItem('username')?'<button class="delete"><i class="fas fa-times"></i></button>' :''
          
      return `
        <div class="card" data-id="${idea._id}">
          ${deleteBtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `
    }).join('')
    this.addEventListeners();
  }

  addEventListeners(){
    //using event delegation for x
    this._ideaListEl.addEventListener('click',(e)=>{
      if(e.target.closest('.delete')){
        e.stopImmediatePropagation() //so that it doesn't propagate up
        const ideaId=e.target.closest('.card').dataset.id;
        console.log(ideaId);
        this.deleteIdea(ideaId);
      }
    })
  }
}

export default IdeaList;