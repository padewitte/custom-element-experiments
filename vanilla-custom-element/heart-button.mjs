const heartSVG = `<svg class="heartSVG" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>`;

customElements.define('heart-button', class extends HTMLElement {

  constructor() {
    super();
    class State {
      constructor(rootElement, val){
        this.data = {val};
        this.rootElement = rootElement;
        this.domDocument = undefined;
      }
      
      setDomDocument(domDocument){
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
        
        if (this.domDocument && this.domDocument.querySelector('.heartButton')) {
          //FIXME We should not trash all node on update
          this.domDocument.querySelector('.heartButton').innerHTML = `${heartSVG}${this.data.val ? "<span class='heartCount'>" + this.data.val  + "</span>" : ""}` ;
          //FIXME Emit an event on state update
        }
      }
    }
    
    this.state = new State(this, 0);
  }
  
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
    
    const _val = parseInt(this.getAttribute('val')) || 0;
    this.shadow = this.attachShadow({
      mode: 'open'
    });
    
    this.state.setDomDocument(this.shadow);
    this.state.val = _val;

    this.shadow.innerHTML = `
    <style>
      ${heartButtonCss}
    </style>
    <span class="heartButton">${heartSVG}${this.state.val ? "<span class='heartCount'>" + this.val  + "</span>" : ""} </span>`;
    this.heartButtonDOMRef = this.shadow.querySelector('.heartButton');
    this.heartButtonDOMRef.addEventListener('click', () => {
      this.val++;
    })
    this.addEventListener('attached', () => { console.log('attached')});
    //this.heatButtonDOMRef.toggleAttribute('hidden');
    
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


const heartButtonCss = `
/** Have to be imported with an absolute path as it looks like it does not resolve the path relativly to the module */

:host {
  /* --heart-color: black; */
  display: inline-flex;
  vertical-align: middle;
}
.heartButton {
  position: relative;
  min-height: 2rem;
  min-width: 2rem;
  border: none;
  background: none;
  fill: var(--heart-color);
  transition-property: filter;
  transition-duration: 0.5s;
  --heart-scale : 1;
}

.heartButton:hover {
  filter: brightness(70%);
  --heart-scale : 1.3;
}

.heartSVG{
  padding-top: 2px;
  transition-property: transform;
  transition-duration: 0.5s;
  transform: scale(var( --heart-scale));
}

.heartCount{
  display: flex;
  position: absolute;
  bottom: 0;
  right: -0.5rem;
  font-size: 75%;
  color: var(--heart-color);
  background-color: #ffffffa1;
  height: 1.2rem;
  width: 1.2rem;
  text-align: center;
  border-radius: 0.2rem;
  align-items: center;
  justify-content: center;
}
`