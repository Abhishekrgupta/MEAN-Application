import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName:any;
  roleId:any;

  constructor() {
    this.userName = sessionStorage.getItem("userName");
    this.roleId = sessionStorage.getItem("roleId");
    //console.log("roleId", this.roleId);


  }

  ngOnInit() {
  }

}
