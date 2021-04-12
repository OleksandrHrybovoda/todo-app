import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Task } from '../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  public openDialog(component, tasks: Task[]) {
    this.dialog.open(component, {
      data: { tasks }
    });
  }

  public openSnackBar(message: string, duration: number = 500,
              horizontalPosition: MatSnackBarHorizontalPosition = 'right',
              verticalPosition: MatSnackBarVerticalPosition = 'top') {
    this._snackBar.open(message, '', {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
}
