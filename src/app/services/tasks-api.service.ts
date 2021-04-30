import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ctor, FieldsMap, ResponseMapper } from '../core/helpers/response-mapper';
import { Task, TaskResponse } from '../core/models/task.model';

@Injectable()
export class TasksApiService {

  private endpoint = environment.api;

  private fieldsMap: FieldsMap<TaskResponse, Task> = {
    "id": "_id",
    "title": "title",
    "description": "desc",
    "creationDate": "created_date",
    "lastUpdatedDate": "last_update_date",
  };

  private taskMapper: ResponseMapper<Task, TaskResponse>;

  constructor(private http: HttpClient) {
    this.taskMapper = new ResponseMapper(new Ctor(Task), this.fieldsMap);
  }

  public getTasks(): Observable<Task[]> {
    const source = this.http.get<TaskResponse[]>(`${this.endpoint}/tasks`);
    return this.taskMapper.mapEntities(source);
  }

}
