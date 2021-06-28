import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { MessagesService } from './messages.service';
import { ApiService } from './api.base';
import { EntityMapperService } from './entity-mapper';
import { LocalStorageService } from './local-storage.service';
import { AuthStorageService } from './auth-storage.service';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    MessagesService,
    AuthService,
    ApiService,
    AuthStorageService,
    EntityMapperService,
    LocalStorageService
  ]
})
export class ServicesModule { }

