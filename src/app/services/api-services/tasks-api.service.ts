import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/modules/tasks/models/task.model';
import { ApiService } from '../api.base';
import { Ctor, FieldsMap } from '../entity-mapper';

@Injectable()
export class TasksApiService extends ApiService {

  // private fieldsResponseMap: FieldsMap<Task> = {
  //   'id': '_id',
  //   'title': 'title',
  //   'description': 'desc',
  //   'creationDate': 'created_date',
  //   'lastUpdatedDate': 'last_update_date',
  // };

  // private fieldRequestsMap: FieldsMap<Task> = {
  //   'id': 'id',
  //   'title': 'title',
  //   'descr': 'description',
  //   'creationDate': 'creationDate',
  //   'lastUpdatedDate': 'lastUpdatedDate',
  // };

  // private taskResponseMapper: EntityMapper<Task>;
  // private taskRequestMapper: EntityMapper<Task>;

  constructor(http: HttpClient) {
    super(http);
    // this.taskResponseMapper = new EntityMapper(new Ctor(Task), this.fieldsResponseMap);
    // this.taskRequestMapper = new EntityMapper(new Ctor(Task), this.fieldRequestsMap);
  }

  // public getTasks(limit: number = 10, offset: number = 0): Observable<Task[]> {
  //   const request: string = `${this.endpoint}/tasks?limit=${limit}&offset=${offset}`;
  //   const source: Observable<Task[]> = this.http.get<Task[]>(request);
  //   return this.taskResponseMapper.mapEntities(source);
  // }

  // public createTask(task: Task): Observable<Task> {
  //   const request = `${this.endpoint}/createTask`;
  //   const taskItem: Task = this.taskRequestMapper.mapEntity(task);
  //   const source = this.http.post<Task>(request, taskItem);
  //   return this.taskResponseMapper.mapSingleEntity(source);
  // }

  // public editTask(task: Task, taskId: string): Observable<Task> {
  //   const request = `${this.endpoint}/task/${taskId}`;
  //   const taskItem: Task = this.taskRequestMapper.mapEntity(task);
  //   const source = this.http.post<Task>(request, taskItem);
  //   return this.taskResponseMapper.mapSingleEntity(source);
  // }

  public deleteTask(taskId: string): Observable<string> {
    const request: string = `${this.endpoint}/task/${taskId}`;
    const source: Observable<string> = this.http.delete<string>(request);
    return source;
  }

}
