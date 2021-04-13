import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksModule } from './modules/tasks/tasks.module';
import { TaskHelperModule } from './services/task-helper-service/task-helper.module';
import { ServicesModule } from './services/message-service/services.module';
import { TasksServiceModule } from './services/tasks.service/tasks-service.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TasksModule,
    TaskHelperModule,
    TasksServiceModule,
    ServicesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
