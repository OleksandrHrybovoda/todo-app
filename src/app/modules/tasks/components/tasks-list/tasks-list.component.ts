import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessagesService } from 'src/app/services/messages.service';
import { EntitiesListBase } from '../../../../components/entities-list-base/entities-list-base.component';
import { Task } from '../../models/task.model';
import { TaskStateManagementService } from '../../services/task-state-management.service';
import { TasksProvider } from '../../services/tasks.provider';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass'],
})
export class TasksListComponent extends EntitiesListBase implements OnInit, OnDestroy {

  public tasks: Task[] = [];

  private limit: number = 10;

  private readonly destroy$ = new Subject();

  constructor(
    msgService: MessagesService,
    private stateManagementService: TaskStateManagementService,
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
    this.prepareTasksToShow();
  }

  public openDialogToAddTask(): void {
    this.msgService.openDialog(TaskFormComponent);
  }

  private init(): void {
    this.prepareTasksToShow();
    this.subscribeToTaskCreation();
    this.subscribeToTaskRemoval();
    this.subscribeToTaskUpdate();
  }

  private prepareTasksToShow(): void {
    this.tasksProvider.getTasks(this.limit, this.tasks.length)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        tasks => {
          this.tasks = tasks;

          const msg: string = `${tasks.length} tasks successfully fetched.`;
          this.showMessage(msg);
        },
        (err) => {
          const msg: string = err.error.message;
          this.showMessage(msg);
        }
      );
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
