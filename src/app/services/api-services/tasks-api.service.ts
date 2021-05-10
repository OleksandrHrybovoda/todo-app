import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseClass } from 'src/app/components/api-base-class/api-base-class.comonent';
import { Ctor, FieldsMap, ResponseMapper } from '../../core/helpers/response-mapper';
import { Task, TaskResponse } from '../../core/models/task.model';

@Injectable()
export class TasksApiService extends ApiBaseClass {

  private fieldsMap: FieldsMap<TaskResponse, Task> = {
    'id': '_id',
    'title': 'title',
    'description': 'desc',
    'creationDate': 'created_date',
    'lastUpdatedDate': 'last_update_date',
  };

  private taskMapper: ResponseMapper<Task, TaskResponse>;

  constructor(private http: HttpClient) {
    super();
    this.taskMapper = new ResponseMapper(new Ctor(Task), this.fieldsMap);
  }

  public getTasks(limit: number = 10, offset: number = 0): Observable<Task[]> {
    const request: string = `${this.endpoint}/tasks?limit=${limit}&offset=${offset}`;
    const source: Observable<TaskResponse[]> = this.http.get<TaskResponse[]>(request);
    return this.taskMapper.mapEntities(source);
  }

  public deleteTask(taskId: string): Observable<string> {
    const request: string = `${this.endpoint}/task/${taskId}`;
    const source: Observable<string> = this.http.delete<string>(request);
    return source;
  }

}
