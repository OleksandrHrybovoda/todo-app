import { NgModule } from '@angular/core';
import { TasksHelper } from './tasks.helper';
import { UsersHelper } from './users.helper';

@NgModule({
  providers: [
    TasksHelper,
    UsersHelper,
  ],
})
export class HelpersModule { }

