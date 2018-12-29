customElements.define('custom-heart-button', class extends HTMLElement {

  // Tells the element which attributes to observer for changes
  // This is a feature added by Custom Elements
  static get observedAttributes() {
    return ['val', 'debug'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.log('attributeChangedCallback called', name);
    switch (name) {
      case 'val':
        if (this._val !== newValue) {
          this._val = parseInt(newValue);
          if (this.shadow) {
            this.shadow.querySelector('.heartCount').innerHTML = this._val ? this._val : "" ;
          }
        }
      case 'debug':
        if (newValue) {
          this.debug = true;
        } else {
          this.debug = false;
        }
    }
  }

  get val() {
    return this._val;
  }

  set val(newValue) {
    this.log('val updated', this._val, newValue);
    this._val = newValue;
    this.setAttribute('val', newValue);
  }

  log(...msg) {
    if (this.debug) {
      console.log(msg)
    }
  }

  reset() {
    this._val = 0;
  }
  connectedCallback() {
    this._val = parseInt(this.getAttribute('val')) || 0;
    this.debug = true;

    const heartSVG = `<svg class="heartSVG" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>`;

    this.shadow = this.attachShadow({
      mode: 'open'
    });

    this.shadow.innerHTML = `
    <style>
    :host {
      --heart-color: black;
      display: inline-flex;
      vertical-align: middle;
    }
    .heartButton {
      position: relative;
      min-height: 1rem;
      min-width: 1rem;
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
      transition-property: transform;
      transition-duration: 0.5s;
      transform: scale(var( --heart-scale));
    }
    
    .heartCount{
      position: absolute;
      bottom: -0.5rem;
      right: -0.5rem;
      font-size: 75%;
      color: var(--heart-color);
      background-color: white;
      height: 1rem;
      width: 1rem;
      vertical-align: middle;
      text-align: center;
      border-radius: 0.5rem;
    }
    
    </style>
    <span class="heartButton">${heartSVG}<span class="heartCount">${this.val ? this.val : ""}</span></span>`;
    this.shadow.querySelector('.heartButton').addEventListener('click', () => {
      this.val++;
    })
  }
});

customElements.define('basic-vanilla-custom-element', class extends HTMLElement {

  reset(){
    this.setAttribute('val', 0);
    this.val = 0;
    //FIXME 
    this.heartButton.val= 0;
  }

  connectedCallback() {
    this.val = parseInt(this.getAttribute('val')) || 0;
    this.innerHTML = `
    <div>I'm a Vanilla JS custom element! <custom-heart-button style="--heart-color: red;" val="${this.val}"></custom-heart-button></div>`;

    this.heartButton = this.querySelector('custom-heart-button');
    this.registerHeartButtonMutations();
    
  }
  
  registerHeartButtonMutations(){
    const domMutationsconfig = {
      attributes: true,
      attributeFilter: ['val']
    };

    const callback = (mutationsList) => {
      for (var mutation of mutationsList) {
        if (mutation.type == 'attributes') {
          console.log( mutation.attributeName + " was just modified", mutation, this.heartButton[mutation.attributeName]);
          this.setAttribute(mutation.attributeName,this.heartButton[mutation.attributeName])
          //this.val = ;
        }
      }
    };
    new MutationObserver(callback).observe(this.heartButton, domMutationsconfig);
  }
});