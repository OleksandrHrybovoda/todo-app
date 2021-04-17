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
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass'],
})
export class TasksListComponent implements OnInit, OnDestroy {

  public tasks: Task[];

  private readonly destroy$ = new Subject();

  constructor(
    private tasksProvider: TasksProvider,
    private stateManagementService: StateManagementService,
    private msgService: MessagesService
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  public trackByItem(index: number, item: Task): number {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openDialogToAddTask(): void {
    this.msgService.openDialog(AddNewTaskComponent);
  }

  private init(): void {
    this.prepareTasksToShow();
    this.subscribeToTaskCreation();
    this.subscribeToTaskRemoval();
  }

  private prepareTasksToShow(): void {
    this.tasksProvider.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
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

  private showMessage(msg: string): void {
    this.msgService.openSnackBar(msg);
  }
}
