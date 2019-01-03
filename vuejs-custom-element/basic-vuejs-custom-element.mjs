import Vue from 'https://unpkg.com/vue/dist/vue.esm.browser.js'
import wrap from 'https://unpkg.com/@vue/web-component-wrapper@1.2.0/dist/vue-wc-wrapper.js?module'
import '../vanilla-custom-element/heart-button.mjs'
import style from './basic-vuejs-custom-element-css.mjs'
// https://unpkg.com/@vue/web-component-wrapper@1.2.0/dist/vue-wc-wrapper.esm.browser.js

//FIXME The ce styling should not use inline style props
//FIXME Try to have computed properties and type checking
//FIXME Load the style from an external mjs module


const Component = {
  name: 'basic-vuejs-custom-element',
  data: function () {
    return {
      dataval: this.val,
      style,
    }
  },
  props: {
      val: {
        type: Number,
        default: 0,
      },
  },
  watch: {
    dataval : function(oldValue, newValue){
      this.$emit('update:dataval', {data : {val : newValue}})
    }
  },
  template: `
  <fieldset :style="style.fieldset">
    <legend @click="decrement" >{{dataval}}</legend>
    I'm a VueJS custom element! <heart-button :val="dataval" @changed="heartButtonChanged" :style="style.heartbutton" ref="heartbutton"></heart-button>
    <button :style="style.reset" @click="reset">reset</button>
  </fieldset>`,
  methods: {
    decrement: function () {
      this.dataval--;
      this.$refs.heartbutton.dataval--;
    },
    heartButtonChanged(evt) {
      this.dataval = evt.detail.data.val;
      //If a store was in used the data modification would be plugged to with the store.
    },
    reset() {
      this.$refs.heartbutton.reset()
    }
  }
}

const CustomElement = wrap(Vue, Component)

window.customElements.define('basic-vuejs-custom-element', CustomElement)