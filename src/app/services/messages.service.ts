import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable()
export class MessagesService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  public openDialog(component: any): void {
    this.dialog.open(component);
  }

  public openSnackBar(
    message: string,
    duration: number = 2000,
    horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    action: string = '',
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
}