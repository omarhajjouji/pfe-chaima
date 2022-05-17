import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private cookiesService:CookieService,private router:Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isSignedIn = this.cookiesService.get("username")!=""
    if (isSignedIn !== true) {
        this.router.navigate(["/"]);
    }else if(this.cookiesService.get("role")!="admin"){
      this.router.navigate(["main"]);
    }
    return true;
  }
  
}
