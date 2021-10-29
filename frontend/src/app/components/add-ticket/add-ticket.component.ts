import { ITicket } from './../../Interfaces/iticket';
import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/ShareData/share.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

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

  constructor( public _share:ShareService, private _ticket:TicketService ) {
    this.SelectTitle = "Prioridad";
    this.PriorityNumber = 0;
    this.TicketName = "";
    this.TicketDescripcion = "";
  }

  ngOnInit(): void {

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
  //Method to add a new ticket
  CreateTicket() {
    //Object to send
    const UserId = sessionStorage.getItem('userId');
    const NewTicket:ITicket = {
      title: this.TicketName,
      description: this.TicketDescripcion,
      importance: this.PriorityNumber,
      userId: UserId?.toString(),
      assignTo: "C7425707-16B9-4547-9A66-42766F7683F4"
    };

    if(this.TicketName != "" && this.PriorityNumber != 0) {
      this._ticket.createTicket(NewTicket).subscribe(data => {
        console.log(data);
      });
    }

  }

}
