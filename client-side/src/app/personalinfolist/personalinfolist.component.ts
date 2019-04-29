import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { PersonalInfoService } from './../services/app.personalinfo.service';
import { PersonalInfo } from './../models/app.personalinfo.model';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-personalinfolist',
  templateUrl: './personalinfolist.component.html'
})
export class PersonalinfolistComponent implements OnInit {

  selectedStatus:any;
  token:any;
  personalInfoList:Array<PersonalInfo>;

  constructor(private personalinfoserv:PersonalInfoService, private router: Router) {
    this.token = sessionStorage.getItem('token');
   }

  ngOnInit() {
    this.selectedStatus = "approved";
    this.getPersonalInfoList();
  }

  getPersonalInfoList(){
    //console.log(this.selectedStatus)
    this.personalinfoserv.getPersonalInfoByStatus(this.selectedStatus, this.token).subscribe(
                                                      (resp: Response) => {
                                                        if (resp.json().status === 200){
                                                            //console.log('personalInfoList :',resp.json().data);
                                                            this.personalInfoList = resp.json().data;
                                                        }
                                                      },
                                                      error =>{
                                                        console.log(`Error Occured ${error}`);
                                                      }
                                                );
  }

  approveInfo(userId){
      //console.log("approve userId :", userId);
      if(confirm("Are you sure to approve this.")){
          this.personalinfoserv.approvePersonalInfo(userId, this.token).subscribe(
                                                      (resp: Response) => {
                                                        if (resp.json().status === 200){
                                                            console.log('Message :',resp.json().message);
                                                        }
                                                      },
                                                      error =>{
                                                        console.log(`Error Occured ${error}`);
                                                      }
                                                );
      }
  }

  rejectInfo(userId){
      //console.log("Reject userId :", userId);
      if(confirm("Are you sure to reject this.")){
          this.personalinfoserv.rejectPersonalInfo(userId, this.token).subscribe(
                                                        (resp: Response) => {
                                                          if (resp.json().status === 200){
                                                              console.log('Message :',resp.json().message);
                                                          }
                                                        },
                                                        error =>{
                                                          console.log(`Error Occured ${error}`);
                                                        }
                                                  );
      }
      
      
  }

  moreInfo(userId){
    //console.log("userId :", userId);
    let navigationExtras: NavigationExtras = {
        queryParams: {
            'userId': userId
        }
    };
    this.router.navigate(['dashboard/personalinfo'], navigationExtras);
  }

}
