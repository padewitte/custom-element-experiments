customElements.define('basic-vanilla-custom-element', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<b>I'm an basic custom element defined in vanilla JS!</b>";
  }
});