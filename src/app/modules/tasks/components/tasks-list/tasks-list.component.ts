import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task } from 'src/app/core/models/task.model';
import { TasksProvider } from '../../../../services/tasks.provider';
import { StateManagementService } from 'src/app/services/state-management.service';
import { MessagesService } from 'src/app/services/messages.service';
import { AddEditTaskFormComponent } from 'src/app/components/add-edit-form-task/add-edit-task-form.component';
import { EntitiesListBaseClass } from 'src/app/components/entities-list/entities-list-base-class.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass'],
})
export class TasksListComponent extends EntitiesListBaseClass implements OnInit, OnDestroy {

  public tasks: Task[];

  private readonly destroy$ = new Subject();

  constructor(
    private stateManagementService: StateManagementService,
    msgService: MessagesService,
    private tasksProvider: TasksProvider,
  ) {
    super(msgService);
  }

  public ngOnInit(): void {
    this.init();
  }

  public trackByItem(index: number, item: Task): string {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showMoreTasks(): void {
    for (let index = 0; index < 10; index++) {
      const id = this.tasks.length + 1 + "";
      this.tasks.push({
        id,
        title: `Task ${id}`,
        description: `Simple Task ${id}`,
        creationDate: `${Date.now()}`,
        lastUpdatedDate: `${Date.now()}`,
      });
    }
    const msg: string = '10 Tasks successfully fetched.';
    this.showMessage(msg);
  }

  public openDialogToAddTask(): void {
    this.msgService.openDialog(AddEditTaskFormComponent);
  }

  private init(): void {
    this.prepareTasksToShow();
    this.subscribeToTaskCreation();
    this.subscribeToTaskRemoval();
    this.subscribeToTaskUpdate();
  }

  private prepareTasksToShow(): void {
    this.tasksProvider.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  private subscribeToTaskCreation(): void {
    this.stateManagementService.getTaskCreationEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => {
        this.addNewTaskToList(task);

        const msg: string = 'Successfully added new task!';
        this.showMessage(msg);
      });
  }

  private addNewTaskToList(task: Task): void {
    this.tasks.push(task);
  }

  private subscribeToTaskRemoval(): void {
    this.stateManagementService.getTaskRemovalEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => {
        this.deleteTaskFromList(task);

        const msg: string = 'Successfully removed task!';
        this.showMessage(msg);
      });
  }

  private deleteTaskFromList(task: Task): void {
    this.tasks = this.tasks.filter(taskItem => taskItem.id !== task.id);
  }

  private subscribeToTaskUpdate(): void {
    this.stateManagementService.getTaskUpdateEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(task => {
        this.updateTaskInList(task);

        const msg: string = 'Task successfully updated!';
        this.showMessage(msg);
      });
  }

  private updateTaskInList(task: Task): void {
    const elementsIndex = this.tasks.findIndex(element => element.id === task.id);
    this.tasks[elementsIndex] = task;
  }

}
