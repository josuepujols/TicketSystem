import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ShareService } from '../../services/ShareData/share.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private _auth: AuthService, public _shared: ShareService) { }

  ngOnInit(): void {
  }

  OnSubmit(): void {
    console.log({ username: this._shared.Name, password: this._shared.Password })
    this._auth.login({ username: this._shared.username, password: this._shared.loginPassword });
  }
}
