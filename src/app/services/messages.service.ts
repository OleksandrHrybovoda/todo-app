import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { ConfirmDialogData } from '../components/confirm/confirm.models';

@Injectable()
export class MessagesService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  public openDialog<T, R>(component: ComponentType<T>, data?: any, width?: string): MatDialogRef<T, R> {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.data = data;
    dialogConfig.width = width;

    return this.dialog.open(component, dialogConfig);
  }

  public async confirm(title: string, message: string, confirmButtonText?: string): Promise<boolean> {
    const data: ConfirmDialogData = new ConfirmDialogData();
    data.title = title;
    data.message = message;
    data.confirmButtonText = confirmButtonText;

    const dialogRef: MatDialogRef<ConfirmComponent, string> =
      this.openDialog<ConfirmComponent, string>(ConfirmComponent, data);

    const res = await dialogRef.afterClosed().toPromise();
    return res === 'true';
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
