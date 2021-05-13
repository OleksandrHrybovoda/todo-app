import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ctor, EntityMapperService, FieldsMap } from 'src/app/services/entity-mapper';
import { ApiService } from '../../../services/api.base';
import { User } from '../models/user.model';

@Injectable()
export class UsersApiService extends ApiService {

  private userCtor: Ctor<User>;

  private userResponseFields: FieldsMap = {
    'id': '_id',
    'firstName': 'first_name',
    'lastName': 'last_name',
    'shortcut': 'shortcut',
    'age': 'age',
    'gender': 'gender',
    'email': 'email',
    'login': 'login',
    'isAdmin': 'isAdmin'
  };

  constructor(http: HttpClient, private entityMapper: EntityMapperService) {
    super(http);

    this.userCtor = new Ctor(User);
  }

  public getUsers(page: number, size: number): Observable<User[]> {
    const url: string = `${this.endpoint}/users?page=${page}&size=${size}`;

    const source: Observable<User[]> = this.http.get<User[]>(url);

    return this.entityMapper.mapEntities(source, this.userResponseFields, this.userCtor);
  }

  public deleteUser(userId: number): Observable<string> {
    const url: string = `${this.endpoint}/user/${userId}`;
    return this.http.delete<string>(url);
  }
}
