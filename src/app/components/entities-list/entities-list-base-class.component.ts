import { Component } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  template: '',
})
export class EntitiesListBaseClass {

  constructor(public msgService: MessagesService) { }

  public showMessage(msg: string): void {
    this.msgService.openSnackBar(msg);
  }

}
