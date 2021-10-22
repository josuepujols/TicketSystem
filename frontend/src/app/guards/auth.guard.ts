import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService) {}

  canActivate(): boolean {
    let isAuthenticated = false;		
		
    this._auth.isAuthenticated$
		.subscribe((resp: boolean) => {
      console.log(resp ? 'Is authenticated' : 'Not Authenticated');
      isAuthenticated = resp
    });
		
    return isAuthenticated; 
  }
  
}
