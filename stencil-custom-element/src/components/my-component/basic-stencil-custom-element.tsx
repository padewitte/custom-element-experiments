import { Component, Prop, Method } from '@stencil/core';
import '../../../../vanilla-custom-element/heart-button.mjs';
@Component({
  tag: 'basic-stencil-custom-element',
  styleUrl: 'basic-stencil-custom-element.css',
  shadow: true
})
export class MyComponent {
  /**
   * Value
   */
  @Prop({ mutable: true, reflectToAttr: true}) val: number = 10;

  //We have to type any as the methods of our Custom Element are not known by TS.
  heartButton!: any;
  
  decrement(event: UIEvent) {
    console.log('Received the decrement click: ', event?event.detail:"");
    this.val--;
  }
  
  valChanged(event : CustomEvent) {
    this.val = event.detail.data.val;
  }
  
  /**
   * Reset the component to its default value.
   * @param event 
   */
  @Method()
  reset(event: UIEvent) {
    console.log('Received the reset click: ', event?event.detail:"");
    this.heartButton.reset();
  }
  
  componentDidLoad() {
    //FIXME When assigned in the prop declaration, 0 is passed to the custom element. Dev pb?
    //this.val = 0;
  }
  
  render() {
    return (
      <fieldset>
        I'm a StencilJS custom element! 
        <heart-button 
          val={this.val}
          onChanged={ev => this.valChanged(ev)}
          ref={(el) => this.heartButton = el as HTMLElement}>
        </heart-button>
        <legend onClick={ev => this.decrement(ev)}>{this.val}</legend>
        <button onClick={ev => this.reset(ev)} class="reset">reset</button>
      </fieldset>
    );
  }
}
