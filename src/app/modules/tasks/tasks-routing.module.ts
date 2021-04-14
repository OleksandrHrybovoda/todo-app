import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../core/route-definitions/task-routes';

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {
}
