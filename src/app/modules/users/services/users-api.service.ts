import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ctor, EntityMapperService, FieldsMap } from 'src/app/services/entity-mapper';
import { ApiService } from '../../../services/api.base';
import { User } from '../models/user.model';

export const userResponseFields: FieldsMap = {
  'id': '_id',
  'firstName': 'first_name',
  'lastName': 'last_name',
  'shortcut': 'shortcut',
  'age': 'age',
  'gender': 'gender',
  'email': 'email',
  'login': 'login',
  'password': 'pwd',
  'isAdmin': 'isAdmin'
};

@Injectable()
export class UsersApiService extends ApiService {

  private userCtor: Ctor<User>;

  private userResponseFields = userResponseFields;

  private userCreateUpdateFields: FieldsMap = {
    '_id': 'id',
    'First_Name': 'firstName',
    'lastName': 'lastName',
    'shortcut': 'shortcut',
    'age': 'age',
    'gender': 'gender',
    'email': 'email',
    'logIN': 'login',
    'pwd': 'password',
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

  public createUser(user: User): Observable<User> {
    const request: string = `${this.endpoint}/createUser`;

    const userToSend: any = this.entityMapper.createEntity(user, this.userCreateUpdateFields);

    const source: Observable<User> = this.http.post<User>(request, userToSend);

    return this.entityMapper.mapEntity(source, this.userResponseFields, this.userCtor);
  }

  public editUser(user: User): Observable<User> {
    const request: string = `${this.endpoint}/user/${user.id}`;

    const userToSend: any = this.entityMapper.createEntity(user, this.userCreateUpdateFields);

    const source: Observable<User> = this.http.post<User>(request, userToSend);

    return this.entityMapper.mapEntity(source, this.userResponseFields, this.userCtor);
  }

  public deleteUser(userId: number): Observable<string> {
    const url: string = `${this.endpoint}/user/${userId}`;
    return this.http.delete<string>(url);
  }

  public isShortcutUnique(shortcut: string): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      const url: string = `${this.endpoint}/isShortcutUnique`;
      this.http.post<boolean>(url, shortcut)
        .toPromise()
        .then(res => {
          resolve(res);
        });
    });
    return promise;
  }
}
