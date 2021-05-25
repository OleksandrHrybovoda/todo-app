import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenerateData } from 'src/app/models/generate-data.model';

@Component({
  selector: 'app-add-entities',
  templateUrl: './add-entities.component.html',
  styleUrls: ['./add-entities.component.sass']
})
export class AddEntitiesComponent implements OnInit {

  public amount: number;

  constructor(public dialogRef: MatDialogRef<AddEntitiesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GenerateData) { }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.initVariables();
  }

  private initVariables(): void {
    this.data.amount = this.amount;
  }
}
