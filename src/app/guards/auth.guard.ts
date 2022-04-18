import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.tokenService.validarToken().pipe(
        tap((isAuth) => (!isAuth) && this.router.navigateByUrl('/login'))
      );
  }

}
