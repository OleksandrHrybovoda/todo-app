import {
  Component,
  Inject,
  Input,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from './confirm.models';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent {

  @Input() public title = '';
  @Input() public message = '';

  @Input() public confirmButtonText = $localize`Confirm`;

  constructor(@Inject(MAT_DIALOG_DATA) private data?: ConfirmDialogData) {
    this.setInputs();
  }

  private setInputs(): void {
    if (this.data === undefined) {
      return;
    }

    this.title = this.data.title;
    this.message = this.data.message;
    this.confirmButtonText = this.data.confirmButtonText;
  }
}
