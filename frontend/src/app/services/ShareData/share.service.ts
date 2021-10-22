import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  //This service is for share data beetween components
  public Name: string;
	public Password: string;
	public ConfirmPassword: string;
	public ShowPassword: boolean;

	public username: string;
	public loginPassword: string;

  constructor() {
    this.Name = '';
		this.Password = '';
		this.ConfirmPassword = '';
		this.ShowPassword = false;

		this.username = '';
		this.loginPassword = '';
  }

  public ClearForm() {
		this.Name = '';
		this.Password = '';
		this.ConfirmPassword = '';
    this.ShowPassword = false;
    this.username = '';
    this.loginPassword = '';
	}

  public ChangeInputStatus() {
		const PasswordInput = document.getElementsByClassName('input-pass');
		if (!this.ShowPassword) {
			this.ShowPassword = true;
			PasswordInput[0].setAttribute('type', 'text');
			PasswordInput[1].setAttribute('type', 'text');
		} else {
			this.ShowPassword = false;
			PasswordInput[0].setAttribute('type', 'password');
			PasswordInput[1].setAttribute('type', 'password');
		}
	}

}
