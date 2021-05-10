import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseClass } from 'src/app/components/api-base-class/api-base-class.comonent';

@Injectable()
export class UsersApiService extends ApiBaseClass {

  constructor(private http: HttpClient) {
    super();
  }

  public deleteUser(userId: number): Observable<string> {
    const request: string = `${this.endpoint}/user/${userId}`;
    const source: Observable<string> = this.http.delete<string>(request);
    return source;
  }
}
