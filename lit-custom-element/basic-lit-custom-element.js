import {LitElement, html} from 'https://unpkg.com/@polymer/lit-element/lit-element.js?module';
    
class MyElement extends LitElement {

  static get properties() {
    return {
      mood: {type: String }
    }
  }

  render() {
    return html`<style> .mood { color: green; } </style>
      I am a <span class="mood">Lit custom element</span> ${this.mood}!`;
  }
  
}

customElements.define('basic-lit-custom-element', MyElement);