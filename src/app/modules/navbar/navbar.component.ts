import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { AddNewTaskComponent } from '../tasks/components/add-new-task/add-new-task.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private msgService: MessagesService) { }

  ngOnInit(): void {
  }

  public openDialogToAddTask(): void {
    this.msgService.openDialog(AddNewTaskComponent);
  }

}
