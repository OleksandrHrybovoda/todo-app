import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.sass']
})
export class DeleteTaskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: Task }) { }

  public ngOnInit(): void {
    console.log(this.data.task);
  }

  public deleteTask(): void {

  }

}
