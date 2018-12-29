import Vue from 'https://unpkg.com/vue/dist/vue.esm.browser.js'
import wrap from 'https://unpkg.com/@vue/web-component-wrapper@1.2.0/dist/vue-wc-wrapper.js'
// https://unpkg.com/@vue/web-component-wrapper@1.2.0/dist/vue-wc-wrapper.esm.browser.js

const Component = {
  name : 'basic-vuejs-custom-element',
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">I am VueJS custom element. Click on me {{count}}.</button>'
}

const CustomElement = wrap(Vue, Component)

window.customElements.define('basic-vuejs-custom-element', CustomElement)

