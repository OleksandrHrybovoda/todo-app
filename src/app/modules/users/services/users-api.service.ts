import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.base';
import { User } from '../models/user.model';

@Injectable()
export class UsersApiService extends ApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getUsers(page: number, size: number): Observable<User[]> {
    const url: string = `${this.endpoint}/users?page=${page}&size=${size}`;
    return this.http.get<User[]>(url);
  }

  public deleteUser(userId: number): Observable<string> {
    const url: string = `${this.endpoint}/user/${userId}`;
    return this.http.delete<string>(url);
  }
}
