import { Component, OnInit } from '@angular/core';
import { IRegister } from './../../Interfaces/iRegister';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { IServerResponse } from 'src/app/Interfaces/iServerResponse';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Propiedades loggin
  public Name:string;
  public Password:string;
  public ConfirmPassword:string;
  public ShowPassword:boolean;

  constructor( private AuthServices:AuthService, private _toast:ToastService ) {
    this.Name = "";
    this.Password = "";
    this.ConfirmPassword = "";
    this.ShowPassword = false;
   }

  ngOnInit(): void {
  }

  Register() {
		if(this.Password == this.ConfirmPassword) {
      //Creo el objeto a enviar
			let NewUser:IRegister = {
        username: this.Name,
        password: this.Password
      };


      this.AuthServices.register(NewUser).subscribe((data: IServerResponse) => {

				data.status
					? this._toast.ShowSuccess({
							title: data.title,
							message: data.message,
					  })
					: this._toast.ShowFailure({
							title: data.title,
							message: data.message,
					  });

            if(data.status) {
              this.ClearForm();
            }
      });
		}
		else {
      alert("Las contraseñas no coinciden!");
		}
	}

	ClearForm() {
		this.Name = "";
		this.Password = "";
		this.ConfirmPassword = "";
	}

  ChangeInputStatus() {
    const PasswordInput = document.getElementsByClassName('input-register');
    if(!this.ShowPassword) {
      this.ShowPassword = true;
      PasswordInput[0].setAttribute('type', 'text');
      PasswordInput[1].setAttribute('type', 'text');
    }
    else {
      this.ShowPassword = false;
      PasswordInput[0].setAttribute('type', 'password');
      PasswordInput[1].setAttribute('type', 'password');
    }
  }

}
