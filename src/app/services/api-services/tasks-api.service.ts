import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ctor, FieldsMap, EntityMapper } from '../../core/helpers/entity-mapper';
import { Task } from '../../core/models/task.model';

@Injectable()
export class TasksApiService {

  private endpoint = environment.api;

  private fieldsResponseMap: FieldsMap<Task> = {
    'id': '_id',
    'title': 'title',
    'description': 'desc',
    'creationDate': 'created_date',
    'lastUpdatedDate': 'last_update_date',
  };

  private fieldRequestsMap: FieldsMap<Task> = {
    'id': 'id',
    'title': 'title',
    'descr': 'description',
    'creationDate': 'creationDate',
    'lastUpdatedDate': 'lastUpdatedDate',
  };

  private taskResponseMapper: EntityMapper<Task>;
  private taskRequestMapper: EntityMapper<Task>;

  constructor(private http: HttpClient) {
    this.taskResponseMapper = new EntityMapper(new Ctor(Task), this.fieldsResponseMap);
    this.taskRequestMapper = new EntityMapper(new Ctor(Task), this.fieldRequestsMap);
  }

  public getTasks(limit: number = 10, offset: number = 0): Observable<Task[]> {
    const request = `${this.endpoint}/tasks?limit=${limit}&offset=${offset}`;
    const source = this.http.get<Task[]>(request);
    return this.taskResponseMapper.mapEntities(source);
  }

  public createTask(task: Task): Observable<Task> {
    const request = `${this.endpoint}/createTask`;
    const taskItem = this.taskRequestMapper.mapEntity(task);
    const source = this.http.post<Task>(request, taskItem);
    return this.taskResponseMapper.mapSingleEntity(source);
  }

  public deleteTask(taskId: string): Observable<string> {
    const request = `${this.endpoint}/task/${taskId}`;
    const source = this.http.delete<string>(request);
    return source;
  }

}
