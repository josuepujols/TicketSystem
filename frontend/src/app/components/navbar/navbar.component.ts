import { IRegister } from './../../Interfaces/iRegister';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    username = this._auth.currentUser$;
    isAuthenticated = this._auth.isAuthenticated$;
    
    constructor(private _auth: AuthService) {
    }

    ngOnInit(): void {
      this._auth.CheckStatus();
      this._auth.GetCurrentUser();
    }

    logout(): void {
      this._auth.logout();
    }

}
