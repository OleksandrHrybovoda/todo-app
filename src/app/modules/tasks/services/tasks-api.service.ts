import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.base';
import {
  Ctor,
  EntityMapperService,
  FieldsMap,
} from '../../../services/entity-mapper';
import { Task } from '../models/task.model';

@Injectable()
export class TasksApiService extends ApiService {

  private taskCtor: Ctor<Task>;

  private taskResponseFields: FieldsMap = {
    'id': '_id',
    'title': 'title',
    'description': 'desc',
    'creationDate': 'created_date',
    'lastUpdatedDate': 'last_update_date',
  };

  private taskCreateUpdateFields: FieldsMap = {
    'id': 'id',
    'title': 'title',
    'descr': 'description',
    'creationDate': 'creationDate',
    'lastUpdatedDate': 'lastUpdatedDate',
  };

  constructor(
    http: HttpClient,
    private entityMapper: EntityMapperService,
  ) {
    super(http);

    this.taskCtor = new Ctor(Task);
  }

  public getTasks(limit: number = 10, offset: number = 0): Observable<Task[]> {
    const request: string = `${this.endpoint}/tasks?limit=${limit}&offset=${offset}`;

    const source: Observable<any[]> = this.http.get<any[]>(request);

    return this.entityMapper.mapEntities(source, this.taskResponseFields, this.taskCtor);
  }

  public createTask(task: Task): Observable<Task> {
    const request: string = `${this.endpoint}/createTask`;
    const taskToSend: any = this.entityMapper.createEntity(task, this.taskCreateUpdateFields);

    const source: Observable<any> = this.http.post<any>(request, taskToSend);

    return this.entityMapper.mapEntity(source, this.taskResponseFields, this.taskCtor);
  }

  public deleteTask(taskId: string): Observable<string> {
    const request: string = `${this.endpoint}/task/${taskId}`;

    const source: Observable<string> = this.http.delete<string>(request);

    return source;
  }

}
