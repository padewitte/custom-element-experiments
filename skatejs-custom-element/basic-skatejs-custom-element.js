import { props, withComponent } from 'https://unpkg.com/skatejs?module';

class WithDefault extends withComponent() {
  static get props() {
    return {
      name: props.string
    };
  }
  render({ name }) {
    return `I am a basic skate custom element, ${name}!`;
  }
}

customElements.define('basic-skatejs-custom-element', WithDefault);