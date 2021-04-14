import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [
    TasksRoutingModule,
    ComponentsModule,
  ],
})
export class TasksModule {
}
