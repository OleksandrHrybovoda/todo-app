import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-entities',
  templateUrl: './add-entities.component.html',
  styleUrls: ['./add-entities.component.sass']
})
export class AddEntitiesComponent {

  constructor(public dialogRef: MatDialogRef<AddEntitiesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancel(): void {
    this.dialogRef.close();
  }

}
