import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { User } from './../models/app.user.model';

@Injectable()
export class UserService {

  url: string;

  constructor(private http: Http) {
      this.url = 'http://localhost:4070';
  }

  addUser(user: User, token: string): Observable<Response>{
      let resp: Observable<Response>;
      let header: Headers = new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
      });

      let options: RequestOptions = new RequestOptions();
      options.headers = header;

      resp = this.http.post(`${this.url}/api/users`, JSON.stringify(user), options);

      return resp;
  }

  getUsers(token: string): Observable<Response>{
      let resp: Observable<Response>;
      let header: Headers = new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
      });

      let options: RequestOptions = new RequestOptions();
      options.headers = header;

      resp = this.http.get(`${this.url}/api/users`, options);

      return resp;
  }
}
