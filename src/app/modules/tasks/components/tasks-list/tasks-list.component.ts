import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEntitiesComponent } from 'src/app/components/add-entities/add-entities.component';
import { AddEntitiesSettings } from 'src/app/components/add-entities/models/add-entities-settings.model';
import { MessagesService } from 'src/app/services/messages.service';
import { EntitiesListBase } from '../../../../components/entities-list-base/entities-list-base.component';
import { Task } from '../../models/task.model';
import { TaskStateManagementService } from '../../services/task-state-management.service';
import { TasksHelper } from '../../services/tasks.helper';
import { TasksProvider } from '../../services/tasks.provider';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent extends EntitiesListBase implements OnInit, OnDestroy {

  public tasks: Task[] = [];

  private page: number = 0;
  private size: number = 15000;

  private readonly destroy$ = new Subject();

  constructor(
    msgService: MessagesService,
    private stateManagementService: TaskStateManagementService,
    private tasksProvider: TasksProvider,
    private tasksHelper: TasksHelper,
    private cd: ChangeDetectorRef
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
    const width = '400px';
    this.msgService.openDialog(TaskFormComponent, undefined, width);
  }

  public openDialogToAddTasks(): void {
    const data: AddEntitiesSettings = {
      title: 'tasks',
      amount: null
    };
    const dialogRef = this.msgService.openDialog(AddEntitiesComponent, data);

    dialogRef.afterClosed().subscribe((result: number) => {
      data.amount = result;
      if (data.amount) {
        this.generateNewTasks(data.amount);
      }
    });
  }

  private generateNewTasks(amount: number): void {
    for (let index = 0; index < amount; index++) {
      const task = {
        id: index.toString(),
        title: `Task ${index + 1}`,
        description: `description ${index + 1}`,
        creationDate: new Date().toString(),
        lastUpdatedDate: new Date().toString()
      };
      this.tasksHelper.createNewTask(task).subscribe(createdTask => {
        this.stateManagementService.sendTaskCreationEvent(createdTask);
      });
    }
  }

  private init(): void {
    this.prepareTasksToShow(false);
    this.subscribeToTaskCreation();
    this.subscribeToTaskRemoval();
    this.subscribeToTaskUpdate();
  }

  public async deleteAllTasks(): Promise<void> {
    const title: string = 'Delete all tasks';
    const message: string = 'Are you sure you want to delete all the tasks ?';
    const action: string = 'DELETE';

    const deletionConfirmed = await this.msgService.confirm(title, message, action);

    if (!deletionConfirmed) {
      return;
    }

    for (const iterator of this.tasks) {
      this.tasksProvider.deleteTask(iterator.id).subscribe(() => {
        this.stateManagementService.sendTaskRemovalEvent(iterator);
      });
    }
  }

  private prepareTasksToShow(showMsg: boolean = true): void {
    this.tasksProvider.getTasks(this.page, this.size)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        tasks => {
          this.tasks = this.tasks.concat(tasks);

          if (showMsg) {
            const msg: string = `${tasks.length} tasks successfully fetched.`;
            this.showMessage(msg);
          }

          if (tasks.length > 0) {
            this.page++;
          }
          this.cd.markForCheck();
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
    this.cd.markForCheck();
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
    this.cd.markForCheck();
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
    this.cd.markForCheck();
  }

}
