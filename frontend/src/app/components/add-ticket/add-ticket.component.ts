import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/ShareData/share.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  constructor( public _share:ShareService) { }

  ngOnInit(): void {
  }

}
