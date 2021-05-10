import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseClass } from 'src/app/components/api-base-class/api-base-class.component';
import { User } from 'src/app/core/models/user.model';

@Injectable()
export class UsersApiService extends ApiBaseClass {

  constructor(private http: HttpClient) {
    super();
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
