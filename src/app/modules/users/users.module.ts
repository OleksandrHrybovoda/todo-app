import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TokenInterceptor } from 'src/app/modules/auth/interceptors/token.interceptor';
import { ComponentsModule } from './components/users-components.module';
import { ServicesModule } from './services/services.module';
import { UsersRoutingModule } from './users-routing.modules';

@NgModule({
  imports: [
    UsersRoutingModule,
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
export class UsersModule {
}
