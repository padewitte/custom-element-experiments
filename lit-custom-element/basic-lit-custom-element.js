import {
  LitElement,
  html
} from 'https://unpkg.com/@polymer/lit-element/lit-element.js?module';
import '../vanilla-custom-element/heart-button.mjs'

class BasicLitCustomElement extends LitElement {

  static get properties() {
    return {
      val: {
        type: Number,
        reflect: true,
      }
    }
  }
  
  constructor(){
    super();
    this.val = 0;
  }
  
  attributeChangedCallback(name, oldval, newval) {
    console.log('attribute change: ', name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }


  render() {
    return html `
      <style>
        ${basicLitCustomElementCss}
      </style>
      <fieldset>
        I'm a Lit JS custom element! <heart-button val="${this.val}" @changed="${this.heartButtonChanged}"></heart-button>
        <legend @click="${this.decrement}">${this.val}</legend>
        <button class="reset" @click="${this.reset}">reset</button>
      </fieldset>`;
  }
  
  reset(e) {
    console.log("reset");
    this.shadowRoot.querySelector('heart-button').reset();
  }
  
  decrement(e) {
    console.log("reset");
    this.val--;
  }

  heartButtonChanged(evt) {
    this.val = evt.detail.data.val;
    //If a store was in used the data modification would be plugged to with the store.
  }
}

customElements.define('basic-lit-custom-element', BasicLitCustomElement);

const basicLitCustomElementCss = `
:host {
  --lit-main-color: #FF2F2F;
  display: block;
}

fieldset {
  position: relative;
}

legend {
  user-select: none;
}

.reset {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 75%;
  color: white;
  padding: 2px 5px;
  background-color: var(--lit-main-color);
  border-radius: 5px;
  border: solid 2px var(--lit-main-color);

}

heart-button {
  --heart-color: var(--lit-main-color);
}
`;