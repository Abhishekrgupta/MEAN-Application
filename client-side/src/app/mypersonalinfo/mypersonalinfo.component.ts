import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, NavigationExtras } from '@angular/router';

import { PersonalInfoService } from './../services/app.personalinfo.service';
import { PersonalInfo } from './../models/app.personalinfo.model';

@Component({
  selector: 'app-mypersonalinfo',
  templateUrl: './mypersonalinfo.component.html'
})
export class MypersonalinfoComponent implements OnInit {
  
  token:any;
  userId:any;
  personalInfo: PersonalInfo;

  constructor(private personalinfoserv:PersonalInfoService, private router: Router) {

    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
   }

  ngOnInit() {
    this.personalinfoserv.getPersonalInfoById(this.userId, this.token).subscribe(
                                                  (resp: Response) => {
                                                    if (resp.json().status === 200){
                                                       
                                                        this.personalInfo = resp.json().data[0];
                                                        console.log('data :',this.personalInfo);
                                                    }
                                                  },
                                                  error =>{
                                                    console.log(`Error Occured ${error}`);
                                                  }
                                            );
  }

  updateInfo(userId){
    let navigationExtras: NavigationExtras = {
          queryParams: {
              'userId': userId
          }
      };
      this.router.navigate(['dashboard/personalinfo'], navigationExtras);
      }

}
