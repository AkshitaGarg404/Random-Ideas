class Modal{
  constructor(){
    this._modal=document.querySelector('#modal')
    this._modalBtn=document.querySelector('#modal-btn')
    this.addEventListeners();
  }
  open(){
    this._modal.style.setProperty('display','block')
  }
  close(){
    this._modal.style.display='none'
  }
  outsideClick(e){
    if(e.target===this._modal){
      this.close();
    }
  }

  addEventListeners(){
    //this.open: this means the event that was triggered so we need to use bind
    this._modalBtn.addEventListener('click',this.open.bind(this));
    window.addEventListener('click',this.outsideClick.bind(this))
    //custom submit event
    document.addEventListener('closemodal',this.close.bind(this))
  }
}

export default Modal;