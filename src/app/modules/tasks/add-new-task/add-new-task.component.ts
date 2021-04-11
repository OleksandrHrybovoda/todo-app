import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Task } from 'src/app/core/models/task.model';
import { TasksComponent } from '../tasks.component';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.sass']
})
export class AddNewTaskComponent implements OnInit {
  addNewTaskForm: FormGroup;
  title = new FormControl('');
  description = new FormControl('');
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<TasksComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tasks: Task[] },
              private _snackBar: MatSnackBar) {
    this.addNewTaskForm = this.fb.group({
      title: this.title,
      description: this.description,
    });
  }

  ngOnInit(): void {
  }

  public createTask(form: FormGroup): void {
    const task = {
      id: this.data.tasks[this.data.tasks.length - 1].id + 1,
      title: form.value.title,
      description: form.value.description,
      lastUpdated: Date.now(),
      lastUpdatedDate: Date.now()
    };
    this.data.tasks.push(task);
    this.openSnackBar();
  }

  private openSnackBar(): void {
    this._snackBar.open('Successfully added!', '', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
