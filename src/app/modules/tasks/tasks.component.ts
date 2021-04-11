import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/core/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private readonly destroy$ = new Subject();

  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.taskService.getTasks
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.tasks = res);
  }

  public openDialogToAddTask(): void {
    this.dialog.open(AddNewTaskComponent, {
      data: { tasks: this.tasks }
    });
  }

  public trackByItem(index: number, item: Task): number {
    return item.id;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
