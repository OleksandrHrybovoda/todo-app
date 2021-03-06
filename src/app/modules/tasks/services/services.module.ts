import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TasksApiService } from './tasks-api.service';
import { TasksProvider } from './tasks.provider';
import { TasksHelper } from './tasks.helper';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    TasksHelper,
    TasksProvider,
    TasksApiService,
  ]
})
export class ServicesModule { }

