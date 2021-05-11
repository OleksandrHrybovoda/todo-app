import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {

  protected endpoint = environment.api;

  constructor(protected http: HttpClient) { }

}
