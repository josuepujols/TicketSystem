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

}
