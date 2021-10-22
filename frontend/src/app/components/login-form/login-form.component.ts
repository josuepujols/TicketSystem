import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  OnSubmit(): void {
    this._auth.login({ username: this.username, password: this.password});
    this.clearForm();
  }

  clearForm(): void {
    this.username = '';
		this.password = '';
  }

}
