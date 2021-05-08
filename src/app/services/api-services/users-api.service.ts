import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersApiService {

  private endpoint = environment.api;

  constructor(private http: HttpClient) { }

  public getUsers(page: number, size: number): Observable<User[]> {
    const request = `${this.endpoint}/users?page=${page}&size=${size}`;
    const source = this.http.get<User[]>(request);
    return source;
  }
}
