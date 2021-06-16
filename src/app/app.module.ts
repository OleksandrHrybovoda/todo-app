import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksModule } from './modules/tasks/tasks.module';
import { ServicesModule } from './services/services.module';
import { MatSelectModule } from '@angular/material/select';
import { UsersModule } from './modules/users/users.module';
import { GuardsModule } from './core/guards/guards.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    ServicesModule,
    TasksModule,
    UsersModule,
    GuardsModule,
    AuthModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
