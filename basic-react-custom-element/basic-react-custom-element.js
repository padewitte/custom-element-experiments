
import React from 'https://unpkg.com/react-ecmascript@1.2.0/react.development.mjs';
import ReactDOM from 'https://unpkg.com/react-ecmascript@1.2.0/react-dom.development.mjs';


class BasicReactCustomElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render('<a href={url}>{name}</a>', mountPoint);
  }
}
customElements.define('basic-react-custom-element', BasicReactCustomElement);


