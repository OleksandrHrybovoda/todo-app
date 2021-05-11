import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'dialog-wrapper',
  templateUrl: './dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.sass']
})
export class DialogWrapperComponent {

  @Input() title: string;

  constructor() { }

}
