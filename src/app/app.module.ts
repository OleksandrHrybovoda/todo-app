import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksModule } from './modules/tasks/tasks.module';
import { HelpersModule } from './core/helpers/helpers.module';
import { ServicesModule } from './services/services.module';
import { NavbarModule } from './modules/navbar/navbar.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HelpersModule,
    ServicesModule,
    TasksModule,
    NavbarModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
