import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  public openDialog(component) {
    this.dialog.open(component);
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
