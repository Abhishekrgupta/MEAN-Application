import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, NavigationExtras } from '@angular/router';

import { User } from './../models/app.user.model';
import { UserService } from './../services/app.user.service';

@Component({
  selector: 'app-showusers',
  templateUrl: './showusers.component.html'
})
export class ShowusersComponent implements OnInit {
  user: User;
  token: any;
  users: Array<User>;
  constructor(private userserv: UserService, private router: Router) {

    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {

    this.userserv.getUsers(this.token).subscribe(
                              (resp: Response) => {
                                if (resp.json().status === 200){
                                    //console.log('Users :',resp.json().data);
                                    this.users = resp.json().data;
                                }
                              },
                              error =>{
                                console.log(`Error Occured ${error}`);
                              }
                            )
  }

  modeInfo(userId){
    // console.log("user : ", userId);
    let navigationExtras: NavigationExtras = {
        queryParams: {
            'userId': userId
        }
    };
    this.router.navigate(['dashboard/personalinfo'], navigationExtras);
  }

}
