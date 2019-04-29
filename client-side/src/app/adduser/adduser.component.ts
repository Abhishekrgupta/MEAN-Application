import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';

import { User } from './../models/app.user.model';
import { UserService } from './../services/app.user.service';
import { Role } from './../models/app.role.model';
import { RoleService } from './../services/app.role.service';
import { SelectionValidator} from './../customvalidators/app.custom.validators';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html'
})
export class AdduserComponent implements OnInit {

  user: User;
  role: Role;
  frmUser: FormGroup;
  token: any;
  error: any;
  success: any;
  roles: Array<Role>;

  constructor(private roleserv: RoleService, private userserv: UserService) {
    this.user = new User(0, '', '', '', 0);
    this.error = '';
    this.success = '';
    this.roles = new Array<Role>();

    this.token = sessionStorage.getItem('token');

    this.frmUser = new FormGroup({
        userName: new FormControl(this.user.userName,
                                  Validators.compose([
                                    Validators.required,
                                    Validators.minLength(5)
                                  ])),
        email: new FormControl(this.user.email,
                                    Validators.compose([
                                      Validators.required,
                                      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
                                    ])),
        password: new FormControl(this.user.password,
                                      Validators.compose([
                                        Validators.required,
                                        Validators.minLength(5)
                                      ])),
        roleId: new FormControl(this.user.roleId,
                                        Validators.compose([
                                          SelectionValidator.checkSelection
                                        ])),

    });
  }

  ngOnInit() {
      this.roleserv.getRoles(this.token).subscribe(
        (resp: Response)=>{
          if (resp.json().status === 200) {
              this.roles = resp.json().data;
          }
        },
        error =>{
          console.log(`Error Occured ${error}`);
        }
      )
  }

  addUser(): void {
      this.user = this.frmUser.value;

      this.userserv.addUser(this.user, this.token).subscribe(
                                                  (resp: Response) => {

                                                      if (resp.json().status === 200){
                                                          this.success = resp.json().message;
                                                          this.error = '';
                                                      } else {
                                                        this.error = resp.json().message;
                                                        this.success = '';
                                                      }
                                                  },
                                                  error =>{
                                                    console.log(`Error Occured ${error}`);
                                                  }
                                              )
  }

  clear(): void {

  }

}
