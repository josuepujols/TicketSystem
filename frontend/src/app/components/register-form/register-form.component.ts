import { ShareService } from './../../services/ShareData/share.service';
import { Component, OnInit } from '@angular/core';
import { IRegister } from 'src/app/Interfaces/iRegister';
import { IServerResponse } from 'src/app/Interfaces/iServerResponse';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

	constructor(
		private AuthServices: AuthService,
		private _toast: ToastService,
    public _share: ShareService
	) {

	}

	ngOnInit(): void {}

	Register() {
		if(this._share.Name != "") {
      if (this._share.Password == this._share.ConfirmPassword) {
        //Creo el objeto a enviar
        let NewUser: IRegister = {
          username: this._share.Name,
          password: this._share.Password,
        };

        this.AuthServices.register(NewUser).subscribe(
          (data: IServerResponse) => {
            data.status
              ? this._toast.ShowSuccess({
                  title: data.title,
                  message: data.message,
                })
              : this._toast.ShowFailure({
                  title: data.title,
                  message: data.message,
                });

            if (data.status) {
              this._share.ClearForm();
            }
          }
        );
      } else {
        alert('Las contraseñas no coinciden!');
      }
    }
    else {
      alert("El nombre de usuario es obligatorio.");
    }
	}


}
