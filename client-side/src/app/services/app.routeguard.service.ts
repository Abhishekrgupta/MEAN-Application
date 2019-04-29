import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AppGuardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate():boolean{
    var isToken = sessionStorage.getItem('token');
   // console.log('istoken :', isToken)

    if (isToken === '' || isToken === null){
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
