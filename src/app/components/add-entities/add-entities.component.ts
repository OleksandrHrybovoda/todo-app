import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEntitiesSettings } from 'src/app/components/add-entities/models/add-entities-settings.model';

@Component({
  selector: 'app-add-entities',
  templateUrl: './add-entities.component.html',
  styleUrls: ['./add-entities.component.sass']
})
export class AddEntitiesComponent implements OnInit {

  public amount: number;
  public title: string;
  public confirmButtonText: string = 'GENERATE';

  constructor(public dialogRef: MatDialogRef<AddEntitiesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddEntitiesSettings) { }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.applySettings();
  }

  private applySettings(): void {
    this.title = this.data.title;
    this.confirmButtonText ??= this.data.confirmButtonText;
    this.amount = this.data.amount;
  }
}
