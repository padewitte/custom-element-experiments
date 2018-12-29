import {
  Input,
  Component,
  ViewEncapsulation,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'custom-button',
  template: `<div><input [(ngModel)]="msg" /><b>{{msg}}</b><button (click)="handleClick()">{{label}} - You clicked me {{this.clicksCt}} time(s).</button></div>`,
  styles: [
    `
    button {
      border: solid 3px;
      padding: 8px 10px;
      background: #bada55;
      font-size: 20px;
    }
  `
  ],
  encapsulation: ViewEncapsulation.Native,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ButtonComponent {
  msg = 'defautl message';
  label = 'I am an Angular webcomponent';
  @Output() action = new EventEmitter<number>();
  clicksCt : number = 0;
  
  handleClick() {
    this.clicksCt = this.clicksCt + 1;
    this.action.emit(this.clicksCt);
  }
}
