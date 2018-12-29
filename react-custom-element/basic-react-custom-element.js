
import React from 'https://unpkg.com/react-ecmascript@1.2.0/react.development.mjs';
import ReactDOM from 'https://unpkg.com/react-ecmascript@1.2.0/react-dom.development.mjs';


class BasicReactCustomElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = 'my name';
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    return ReactDOM.render(React.createElement('a', {href : url}, `I am a React element ${name}`), mountPoint);
  }
}
customElements.define('basic-react-custom-element', BasicReactCustomElement);


