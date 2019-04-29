import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {HomeComponent} from './home/home.component';
import {RoleComponent} from './role/role.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';

import { AppGuardService} from './services/app.routeguard.service';
import { AdduserComponent } from './adduser/adduser.component';
import { ShowusersComponent } from './showusers/showusers.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { PersonalinfolistComponent } from './personalinfolist/personalinfolist.component';
import { MypersonalinfoComponent } from './mypersonalinfo/mypersonalinfo.component';


const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children : [
        {
          path: 'home',
          component: HomeComponent,
          canActivate: [AppGuardService]
        },
        {
          path: 'role',
          component: RoleComponent,
          canActivate: [AppGuardService]
        },
        {
          path: 'adduser',
          component: AdduserComponent,
          canActivate: [AppGuardService]
        },
        {
          path: 'showusers',
          component: ShowusersComponent,
          canActivate: [AppGuardService]
        },
        {
          path: 'personalinfo',
          component: PersonalinfoComponent,
          canActivate: [AppGuardService]
        },
        {
          path: 'personalinfolist',
          component: PersonalinfolistComponent,
          canActivate: [AppGuardService]
        },
        {
          path: 'mypersonalinfo',
          component: MypersonalinfoComponent,
          canActivate: [AppGuardService]
        }
      ]
    },

    {
      path: 'logout',
      component: LogoutComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
