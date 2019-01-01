import './heart-button.mjs';

customElements.define('basic-vanilla-custom-element', class extends HTMLElement {

  reset() {
    this.setAttribute('val', 0);
    this.val = 0;
    //FIXME 
    this.heartButton.val = 0;
  }

  connectedCallback() {
    this.shadow = this.attachShadow({
      mode: 'open'
    });

    this.val = parseInt(this.getAttribute('val')) || 0;
    this.shadow.innerHTML = `
    <style>
      @import '/vanilla-custom-element/basic-vanilla-custom-element.css';
    </style>
    <fieldset>
      I'm a Vanilla JS custom element! <heart-button val="${this.val}"></heart-button>
      <legend>${this.val}</legend>
      <button class="reset">reset</button>
    </fieldset>`;

    this.heartButton = this.shadow.querySelector('heart-button');
    this.legendDOMRef = this.shadow.querySelector('legend');
    this.legendDOMRef.addEventListener('click', () => {
      this.heartButton.val = this.heartButton.val - 1;
    })

    this.resetDOMRef = this.shadow.querySelector('.reset');
    this.resetDOMRef.addEventListener('click', () => {
      this.reset();
    })

    this.registerHeartButtonMutations();

  }

  registerHeartButtonMutations() {
    const domMutationsconfig = {
      attributes: true,
      attributeFilter: ['val']
    };

    const callback = (mutationsList) => {
      for (var mutation of mutationsList) {
        if (mutation.type == 'attributes') {
          console.log(mutation.attributeName + " was just modified", mutation, this.heartButton[mutation.attributeName]);
          this.setAttribute(mutation.attributeName, this.heartButton[mutation.attributeName])
        }
      }
    };
    new MutationObserver(callback).observe(this.heartButton, domMutationsconfig);
  }

  static get observedAttributes() {
    return ['val'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${this.nodeName}/${name} : attributeChangedCallback called`, newValue);
    switch (name) {
      case 'val':
        if (this.val !== newValue) {
          this.val = parseInt(newValue);
          if (this.shadow) {
            //FIXME We should not trash all node on update
            this.legendDOMRef.innerHTML = this.val;
          }
        }
    }
  }
});