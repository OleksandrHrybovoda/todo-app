import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ctor, FieldsMap, ResponseMapper } from '../../core/helpers/response-mapper';
import { Task, TaskResponse } from '../../core/models/task.model';

@Injectable()
export class TasksApiService {

  private endpoint = environment.api;

  private fieldsMap: FieldsMap<TaskResponse, Task> = {
    'id': '_id',
    'title': 'title',
    'description': 'desc',
    'creationDate': 'created_date',
    'lastUpdatedDate': 'last_update_date',
  };

  private taskMapper: ResponseMapper<Task, TaskResponse>;

  constructor(private http: HttpClient) {
    this.taskMapper = new ResponseMapper(new Ctor(Task), this.fieldsMap);
  }

  public getTasks(limit: number = 10, offset: number = 0): Observable<Task[]> {
    const request = `${this.endpoint}/tasks?limit=${limit}&offset=${offset}`;
    const source = this.http.get<TaskResponse[]>(request);
    return this.taskMapper.mapEntities(source);
  }

}
