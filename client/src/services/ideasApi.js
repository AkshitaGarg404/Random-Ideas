//import axios api service
import axios from 'axios'

class IdeasApi{
  constructor(){
    //set backend url
    this._apiUrl='/api/ideas'
  }

  getIdeas(){
    return axios.get(this._apiUrl);
  }

  createIdea(data){
    return axios.post(this._apiUrl,data);
  }

  updateIdea(id,data){
    return axios.put(`${this._apiUrl}/${id}`,data);
  }

  deleteIdea(id){
    const username=localStorage.getItem('username') || ''
    return axios.delete(`${this._apiUrl}/${id}`,{
      data:{
        username
      }
    })
  }
}


//directly return an instance of this so that we can run functions directly
export default new IdeasApi();