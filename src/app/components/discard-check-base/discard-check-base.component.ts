import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  template: '',
})
export class BaseFormComponent {

  form: FormGroup;

  constructor(protected msgService: MessagesService, protected matDialogRef: MatDialogRef<any>) { }

  public async onCancelClick(): Promise<void> {
    if (this.form.dirty) {
      const confirmed = await this.confirmExit();
      if (!confirmed) {
       return;
      }
    }

    this.matDialogRef.close();
  }

  private async confirmExit(): Promise<boolean> {
    const title = 'Are you sure you want to leave?';
    const message = 'You have unsaved changes. Are you sure you want to leave this page? Unsaved changes will be lost.';
    const confirmButtonText = 'Leave';

    return this.msgService.confirm(title, message, confirmButtonText);
  }

}
