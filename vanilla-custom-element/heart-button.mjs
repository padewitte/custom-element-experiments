const heartSVG = `<svg class="heartSVG" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>`;

customElements.define('heart-button', class extends HTMLElement {

  // Tells the element which attributes to observer for changes
  // This is a feature added by Custom Elements
  static get observedAttributes() {
    return ['val'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} attribute changed - attributeChangedCallback called`, newValue);
    switch (name) {
      case 'val':
        //TODO See how parseInt behave
        if (this.state && this.state.val !== parseInt(newValue)) {
          console.log(`${name} attribute mutating`,this.state.val, newValue);
          this.state.val = parseInt(newValue);
        }
    }
  }

 

  reset() {
    this.setAttribute('val', 0);
  }
  connectedCallback() {
    console.log("Creating an heart button");
    class State {
      constructor(rootElement, domDocument, val){
        this.data = {val};
        this.rootElement = rootElement;
        this.domDocument = domDocument;
      }
      
      get val() {
        return this.data.val;
      }
    
      set val(newValue) {
        console.log('val property updated', this.data.val, newValue);
        this.data.val = newValue;
        
        //Reflect property value to attribute val
        if(this.rootElement){
          this.rootElement.setAttribute('val', newValue);
          this.rootElement.dispatchEvent(new CustomEvent("changed", {detail : {data : this.data}}))
        }
        
        if (this.domDocument) {
          //FIXME We should not trash all node on update
          this.domDocument.querySelector('.heartButton').innerHTML = `${heartSVG}${this.data.val ? "<span class='heartCount'>" + this.data.val  + "</span>" : ""}` ;
          //FIXME Emit an event on state update
        }
      }
    }
    
    const _val = parseInt(this.getAttribute('val')) || 0;
    this.shadow = this.attachShadow({
      mode: 'open'
    });
    
    this.state = new State(this, this.shadow, _val);

    this.shadow.innerHTML = `
    <style>
    @import '/vanilla-custom-element/heart-button.css';
    </style>
    <span class="heartButton">${heartSVG}${this.state.val ? "<span class='heartCount'>" + this.val  + "</span>" : ""} </span>`;
    this.shadow.querySelector('.heartButton').addEventListener('click', () => {
      this.val++;
    })
  }
  
  get val(){
    console.log('val element getter used.')
    return this.state.val;
  }
  
  set val(val){
    console.log('val element setter used.')
    this.state.val = val;
  }
});