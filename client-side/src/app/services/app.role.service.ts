import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import {Role} from './../models/app.role.model';

@Injectable()
export class RoleService {
  url: string;

  constructor(private http: Http) {
      this.url = 'http://localhost:4070';
  }

  getRoles(token: string): Observable<Response>{
      let resp: Observable<Response>;
      let header: Headers = new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
      });

      let options: RequestOptions = new RequestOptions();
      options.headers = header;

      resp = this.http.get(`${this.url}/api/roles`, options);

      return resp;
  }

  addRole(role: Role, token: string): Observable<Response>{
      let resp: Observable<Response>;
      let header: Headers = new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
      });

      let options: RequestOptions = new RequestOptions();
      options.headers = header;

      resp = this.http.post(`${this.url}/api/roles`, JSON.stringify(role), options);

      return resp;
  }
}
