import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task } from 'src/app/core/models/task.model';
import { TasksProvider } from '../../../../services/tasks.provider';
import { MessagesService } from '../../../../services/messages.service';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';
import { StateManagementService } from 'src/app/services/state-management.service';

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
    private msgService: MessagesService,
    private stateManagementService: StateManagementService
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  public openDialogToAddTask(): void {
    this.msgService.openDialog(AddNewTaskComponent);
  }

  public trackByItem(index: number, item: Task): number {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private init(): void {
    this.tasksProvider.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.tasks = tasks;
      });
    this.subscribeToTaskCreation();
  }

  private subscribeToTaskCreation(): void {
    this.stateManagementService.subscribeToTaskCreationEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (task) => {
          this.tasks.push(task);
        }
      );
  }
}
