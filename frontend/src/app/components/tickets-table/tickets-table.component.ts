import { Component, OnInit } from '@angular/core';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilter } from 'src/app/Interfaces/ipagination-filter';
import { ITicket } from 'src/app/Interfaces/iticket';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.scss']
})
export class TicketsTableComponent implements OnInit {

  results!: IPagedData;
  filters: IPaginationFilter = { pageNumber: 1, pageSize: 10, searchTerm: '' };

  constructor(private _ticket: TicketService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    
    const role: string | null  = sessionStorage.getItem('role');
    const userId: string | null = sessionStorage.getItem('userId');

    if(role != null && userId != null) {
      
      const request = (role === 'Admin')
      ? this._ticket.getAllTickets(this.filters) 
      : this._ticket.getAllUserTickets(this.filters, userId);

      request.subscribe((data: IPagedData) => this.results = data);
    }
    
  }

}
