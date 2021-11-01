import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NgxConfirmBoxService } from 'ngx-confirm-box';
import { TicketService } from '../ticket/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmboxService {

  constructor(private _confirm: NgxConfirmBoxService, private _ticket: TicketService) { }

  showConfirmBox(): void {
    this._confirm.show();
  }

  hideConfirmBox(): void {
    this._confirm.hide();
  }

  confirmChange(cond: boolean, id: string): void {
    if(cond) {
      // console.log("show confirmation", cond);
      this._ticket.deleteTicket(id);
      this.hideConfirmBox();
    }else {
      this._confirm.hide();
    }
  }

}
