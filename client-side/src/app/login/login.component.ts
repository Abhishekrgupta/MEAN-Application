import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import {User} from './../models/app.user.model';
import { LoginService } from './../services/app.login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  frmLogin: FormGroup;
  message: any;

  constructor( private loginserv: LoginService, private router: Router) {
    this.user = new User(0, '', '', '', 0);

    this.message = '';

    this.frmLogin = new FormGroup({
      userName : new FormControl(this.user.userName,
                                      Validators.compose([
                                        Validators.required
                                      ])
                                  ),

        password : new FormControl(this.user.password,
                                      Validators.compose([
                                        Validators.required
                                      ])
                                    )
    });
   }

  ngOnInit() {
  }

  cancle(): void{

  }

  signIn(): void {
      this.user = this.frmLogin.value;
      //console.log(this.user)

      this.loginserv.signIn(this.user).subscribe(
          (resp: Response) => {
              if (resp.json().status === 200){
                  sessionStorage.setItem('token', resp.json().data.token);
                  sessionStorage.setItem('userId', resp.json().data.userId);
                  sessionStorage.setItem('userName', resp.json().data.userName);
                  sessionStorage.setItem('roleId', resp.json().data.roleId);

                  //console.log(sessionStorage.getItem('userName'));
                  this.router.navigate(['dashboard/home']);


              } else {
                  this.message = resp.json().message;
              }

          },
          error =>{
              console.log(`Error Occured ${error}`);
          }
        );
  }

}

