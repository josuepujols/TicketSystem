import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NgxConfirmBoxService } from 'ngx-confirm-box';
import { Observable } from 'rxjs';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilter } from 'src/app/Interfaces/ipagination-filter';
import { TicketService } from '../ticket/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmboxService {
  filters: IPaginationFilter = {
		pageNumber: 1,
		pageSize: 10,
		searchTerm: '',
    numberStatus: 0
	};
  constructor(private _confirm: NgxConfirmBoxService, private _ticket: TicketService) { }

  showConfirmBox(): void {
    this._confirm.show();
  }

  hideConfirmBox(): void {
    this._confirm.hide();
  }

  Refresh(): void {
    this._ticket.getAllTickets(this.filters);
  }

  confirmChange(cond: boolean, id: string): void {
    if(cond) {
      // console.log("show confirmation", cond);
      this._ticket.deleteTicket(id);
      this.Refresh();
      this.hideConfirmBox();
    }else {
      this._confirm.hide();
    }
  }

}
