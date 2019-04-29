import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Role } from './../models/app.role.model';
import { RoleService } from './../services/app.role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit {
  role: Role;
  frmRole: FormGroup;
  token: any;
  error: any;
  success: any;
  tableHeaders: Array<string>;
  roles: Array<Role>;

  constructor(private roleserv: RoleService) {
      this.role = new Role(0, '');
      this.error = '';
      this.success = '';
      this.tableHeaders = new Array<string>();
      this.roles = new Array<Role>();

      this.frmRole = new FormGroup({
          roleId : new FormControl(this.role.roleId,
                                      Validators.compose([
                                        Validators.required,
                                        Validators.pattern('[0-9]+'),
                                      ])
                                    ),
          roleName : new FormControl(this.role.roleName,
                                      Validators.compose([
                                        Validators.required,
                                        Validators.pattern('[a-zA-Z ]*'),
                                      ])
                                    ),
      });

      this.token = sessionStorage.getItem('token');
   }

   ngOnInit() {
        this.tableHeaders = new Array<string>();
        this.roles = new Array<Role>();

        for (let r in this.role){
            this.tableHeaders.push(r);
        }

        this.roleserv.getRoles(this.token).subscribe(
          (resp: Response)=>{
            if (resp.json().status === 200){
                 // console.log('Roles :',resp.json().data);
                this.roles = resp.json().data;
            }
          },
          error =>{
            console.log(`Error Occured ${error}`);
          }
        )
  }

   addRole(): void {
      this.role = this.frmRole.value;

      this.roleserv.addRole(this.role, this.token).subscribe(
                                        (resp: Response) => {

                                            if (resp.json().status === 200){
                                                this.success = resp.json().message;
                                                this.error = '';
                                                this.ngOnInit();
                                                //this.clear();
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

   clear(): void{

   }



}
