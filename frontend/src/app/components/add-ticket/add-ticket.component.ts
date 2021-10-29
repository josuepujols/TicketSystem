import { ISupports } from './../../Interfaces/isupport';
import { ITicket } from './../../Interfaces/iticket';
import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/ShareData/share.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  public SelectTitle:string;
  public PriorityNumber:number;

  public TicketName:string;
  public TicketDescripcion:string;
  public UserAssingId:string;
  public UserName:string;

  public UsersSupports:any[];

  constructor( public _share:ShareService, private _ticket:TicketService, private _toast:ToastService ) {
    this.SelectTitle = "Prioridad";
    this.PriorityNumber = 0;
    this.TicketName = "";
    this.TicketDescripcion = "";
    this.UsersSupports = [];
    this.UserAssingId = "Seleccione un Usuario";
    this.UserName = "Seleccione un Usuario";
  }

  ngOnInit(): void {
    this._ticket.GetSupportMembes().subscribe(data => {
      data.forEach(item => {
        this.UsersSupports.push(item);
      });
    });
1
    console.log(this.UsersSupports);
  }

  LowPriority() {
    this.PriorityNumber = 1;
    this.SelectTitle = "Baja";
  }

  MediumPriority() {
    this.PriorityNumber = 2;
    this.SelectTitle = "Promedio";
  }

  HighPriority() {
    this.PriorityNumber = 3;
    this.SelectTitle = "Alta";
  }

  ClearForm() {
    this.TicketName = "";
    this.TicketDescripcion = "";
    this.PriorityNumber = 0;
    this.UserAssingId = "Seleccione un Usuario";
    this.SelectTitle = "Prioridad";
  }

  //Method to add a new ticket
  CreateTicket() {
    //Object to send
    const UserId = sessionStorage.getItem('userId');
    const NewTicket:ITicket = {
      title: this.TicketName,
      description: this.TicketDescripcion,
      importance: this.PriorityNumber,
      userId: UserId?.toString(),
      assignTo: this.UserAssingId,
      UserName: ""
    };

    if(this.TicketName != "" && this.PriorityNumber != 0 && this.UserAssingId != "Seleccione un Usuario") {
      this._ticket.createTicket(NewTicket).subscribe(data => {
        if (data) {
          this._toast.ShowSuccess({title: "Exito!", message: "Se ha registrado el ticket correctamente."});
          this.ClearForm();
        }
        else {
          this._toast.ShowFailure({title: "Error!", message: "No se pudo registrar el ticket."});
        }
      });
    }

    else {
      alert("Debe llenar todos los campos.");
    }

  }

}
