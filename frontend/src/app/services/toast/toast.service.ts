import { Injectable } from '@angular/core';
import { ToastrService as Toast } from 'ngx-toastr';
import { IToastMessage } from 'src/app/Interfaces/itoast-message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _toast: Toast) { }

  	public ShowSuccess(model: IToastMessage): void {
		this._toast.success(model.message, model.title, { timeOut: 3000 });
	}

	public ShowFailure(model: IToastMessage): void {
		this._toast.error(model.message, model.title, { timeOut: 3000 });
	}


}
