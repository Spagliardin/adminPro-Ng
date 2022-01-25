import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService,
               private router: Router 
    ){}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ) {

  return this.userService.vaidateToken().pipe(
    tap( (isAuth: Boolean) => {
      if (!isAuth) {
        this.router.navigateByUrl('/login')
      }
    })
  );

  }
  
}
