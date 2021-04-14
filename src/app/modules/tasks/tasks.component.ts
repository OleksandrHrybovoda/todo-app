import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { TaskService } from 'src/app/services/tasks.service/task.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/services/message-service/message.service';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private readonly destroy$ = new Subject();

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.taskService.getTasks
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.tasks = res));
  }

  public openDialogToAddTask(): void {
    this.messageService.openDialog(AddNewTaskComponent);
  }

  public trackByItem(index: number, item: Task): number {
    return item.id;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
