import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksModule } from './modules/tasks/tasks.module';
import { ServicesModule } from './services/services.module';
import { MatSelectModule } from '@angular/material/select';
import { UsersModule } from './modules/users/users.module';
import { GuardsModule } from './modules/auth/guards/guards.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenInterceptor } from './modules/auth/interceptors/token.interceptor';
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
    },
    { provide: LOCALE_ID, useValue: 'en' }
  ]
})
export class AppModule { }
