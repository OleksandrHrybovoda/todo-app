import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/users-components.module';
import { ServicesModule } from './services/services.module';
import { UsersRoutingModule } from './users-routing.modules';

@NgModule({
  imports: [
    UsersRoutingModule,
    ComponentsModule,
    ServicesModule,
  ],
})
export class UsersModule {
}
