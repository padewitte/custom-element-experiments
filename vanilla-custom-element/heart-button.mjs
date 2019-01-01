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
        if (this._val !== newValue) {
          this._val = parseInt(newValue);
          
        }
    }
  }

  get val() {
    return this._val;
  }

  set val(newValue) {
    console.log('val property updated', this._val, newValue);
    this._val = newValue;
    
    //Reflect property value to attribute val
    this.setAttribute('val', newValue);
    
    if (this.shadow) {
      //FIXME We should not trash all node on update
      this.shadow.querySelector('.heartButton').innerHTML = `${heartSVG}${this.val ? "<span class='heartCount'>" + this.val  + "</span>" : ""}` ;
    }
  }

  reset() {
    this.setAttribute('val', 0);
  }
  connectedCallback() {
    this._val = parseInt(this.getAttribute('val')) || 0;
    this.debug = true;
    this.shadow = this.attachShadow({
      mode: 'open'
    });

    this.shadow.innerHTML = `
    <style>
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
    
    </style>
    <span class="heartButton">${heartSVG}${this.val ? "<span class='heartCount'>" + this.val  + "</span>" : ""} </span>`;
    this.shadow.querySelector('.heartButton').addEventListener('click', () => {
      this.val++;
    })
  }
});