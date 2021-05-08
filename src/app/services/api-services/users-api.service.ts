import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersApiService {

  private endpoint = environment.api;

  constructor(private http: HttpClient) { }

  public deleteUser(userId: number): Observable<string> {
    const request = `${this.endpoint}/user/${userId}`;
    const source = this.http.delete<string>(request);
    return source;
  }
}
