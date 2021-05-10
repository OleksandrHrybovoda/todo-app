import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  template: '',
})
export class ApiBaseClass {
  public endpoint = environment.api;

  constructor() {}
}
