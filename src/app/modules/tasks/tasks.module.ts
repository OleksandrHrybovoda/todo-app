import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [
    TasksRoutingModule,
    ComponentsModule,
    ServicesModule,
  ],
})
export class TasksModule {
}
