import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../../components/shared-components.module';
import { MatTableModule } from '@angular/material/table';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  declarations: [
    UsersListComponent,
    UserComponent
  ],
})
export class UsersComponentsModule {
}
