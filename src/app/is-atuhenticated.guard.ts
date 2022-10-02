import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IsAtuhenticatedGuard implements CanActivate {

  constructor(public authService : AuthServiceService, public router : Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn.pipe(
      tap(isLoggedIn => {
        if(!isLoggedIn){
          this.router.navigate(['login']);
        }
      })
    );
  }

}
