import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TokenInterceptor } from 'src/app/modules/auth/interceptors/token.interceptor';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [
    TasksRoutingModule,
    ComponentsModule,
    ServicesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class TasksModule {
}
