import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    ComponentsModule,
    ServicesModule,
  ],
})

export class AuthModule {
}
