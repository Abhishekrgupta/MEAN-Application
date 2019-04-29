import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import { LoginComponent } from './login/login.component';

import { routing } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RoleComponent } from './role/role.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ShowusersComponent } from './showusers/showusers.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';

import { LoginService } from './services/app.login.service';
import { RoleService } from './services/app.role.service';
import { AppGuardService } from './services/app.routeguard.service';
import { UserService } from './services/app.user.service';
import { PersonalInfoService } from './services/app.personalinfo.service';
import { PersonalinfolistComponent } from './personalinfolist/personalinfolist.component';

import { SearchPipe } from './pipes/search.pipe';
import { MypersonalinfoComponent } from './mypersonalinfo/mypersonalinfo.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RoleComponent,
    AppComponent,
    DashboardComponent,
    LogoutComponent,
    AdduserComponent,
    ShowusersComponent,
    PersonalinfoComponent,
    PersonalinfolistComponent,
    SearchPipe,
    MypersonalinfoComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule
  ],

  providers: [
    LoginService,
    RoleService,
    AppGuardService,
    UserService,
    PersonalInfoService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
