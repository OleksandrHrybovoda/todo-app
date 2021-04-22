import { Component } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.sass']
})
export class ShowMessageComponent {
  msg: string;

  constructor(public msgService: MessagesService) { }

  public showMessage(msg: string): void {
    this.msgService.openSnackBar(msg);
  }

}
