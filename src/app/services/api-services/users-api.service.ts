import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/users/models/user.model';
import { ApiService } from '../api.base';

@Injectable()
export class UsersApiService extends ApiService {

  constructor(http: HttpClient) {
    super(http);
  }

 public getUsers(page: number, size: number): Observable<User[]> {
    const request: string = `${this.endpoint}/users?page=${page}&size=${size}`;
    const source: Observable<User[]> = this.http.get<User[]>(request);
    return source;
  }

 public deleteUser(userId: number): Observable<string> {
    const request: string = `${this.endpoint}/user/${userId}`;
    const source: Observable<string> = this.http.delete<string>(request);
    return source;
  }
}
