import Vue from 'https://unpkg.com/vue/dist/vue.esm.browser.js'
import wrap from 'https://unpkg.com/@vue/web-component-wrapper@1.2.0/dist/vue-wc-wrapper.js'
import '../vanilla-custom-element/heart-button.mjs'
// https://unpkg.com/@vue/web-component-wrapper@1.2.0/dist/vue-wc-wrapper.esm.browser.js

const Component = {
  name : 'basic-vuejs-custom-element',
  data : function(){
    return {
      dataVal : 0,
    }
  },
  computed: {
    val: {
      // getter
      get: function () {
        return this.dataVal
      },
      // setter
      set: function (newValue) {
        this.dataVal = newValue
      }
    }
  },
  /*props: {
      val: {
        type: Number,
        default: 0
      },
  },*/
  template: `
  <fieldset>
    <legend @click="decrement">{{dataVal}}</legend>
    I'm a VueJS custom element! <heart-button :val="dataVal" @changed="heartButtonChanged" ref="heartbutton"></heart-button>
    <button class="reset" @click="reset">reset</button>
  </fieldset>`,
  methods: {
    decrement: function () {
      this.val--;
      this.$refs.heartbutton.val--;
    },
    heartButtonChanged(evt){
      this.dataVal = evt.detail.data.val;
    },
    reset(){
      this.$refs.heartbutton.reset()
    }
  }
}

const CustomElement = wrap(Vue, Component)

window.customElements.define('basic-vuejs-custom-element', CustomElement)

