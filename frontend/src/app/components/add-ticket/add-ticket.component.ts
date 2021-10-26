import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/ShareData/share.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  public SelectTitle:string;
  public PriorityNumber:number;

  constructor( public _share:ShareService) {
    this.SelectTitle = "Prioridad";
    this.PriorityNumber = 0;
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

}
