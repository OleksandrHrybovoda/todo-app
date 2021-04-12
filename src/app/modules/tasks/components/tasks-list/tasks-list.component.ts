import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private readonly destroy$ = new Subject();

  constructor(private taskService: TaskService,
              public dialog: MatDialog,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.taskService.getTasks
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.tasks = res);
  }

  public openDialogToAddTask(): void {
    this.messageService.openDialog(AddNewTaskComponent, this.tasks);
  }

  public trackByItem(index: number, item: Task): number {
    return item.id;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
