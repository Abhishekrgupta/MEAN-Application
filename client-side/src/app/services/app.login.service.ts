import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { User } from './../models/app.user.model';

@Injectable()
export class LoginService{
    url: string;

    constructor(private http: Http) {
        this.url = 'http://localhost:4070';
    }

    signIn(user: User): Observable<Response>{
        let resp: Observable<Response>;
        let header: Headers = new Headers({'Content-Type': 'application/json'});

        let options: RequestOptions = new RequestOptions();
        options.headers = header;

        resp = this.http.post(`${this.url}/api/users/auth`, JSON.stringify(user), options);

        return resp;
    }
}
