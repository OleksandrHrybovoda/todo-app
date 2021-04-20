import { NgModule } from '@angular/core';
import { UsersComponentsModule } from './components/users-components.module';
import { UsersRoutingModule } from './users-routing.modules';

@NgModule({
  imports: [
    UsersRoutingModule,
    UsersComponentsModule
  ],
})
export class UsersModule {
}
