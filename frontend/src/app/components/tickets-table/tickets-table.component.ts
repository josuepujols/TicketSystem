import { ToastService } from './../../services/toast/toast.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilter } from 'src/app/Interfaces/ipagination-filter';
import { ITicket } from 'src/app/Interfaces/iticket';
import { TicketService } from 'src/app/services/ticket/ticket.service';

import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ConfirmboxService } from 'src/app/services/confirmbox/confirmbox.service';

@Component({
	selector: 'app-tickets-table',
	templateUrl: './tickets-table.component.html',
	styleUrls: ['./tickets-table.component.scss'],
})
export class TicketsTableComponent implements OnInit, OnChanges {
	results$: Observable<IPagedData | null> = this._ticket.ticketsObserver$;
	public UsersSupports: any[] = [];

	filters: IPaginationFilter = {
		pageNumber: 1,
		pageSize: 10,
		searchTerm: '',
	};

	// actions icons
	faEdit = faEdit;
	faEye = faEye;
	faTrash = faTrash;

	// Ticket to be remove from DB
	private selectedTicket!: string;

	confirmBoxProp = {
		bgColor: 'rgba(0,0,0,0.5)',
		confirmHeading: 'Desea borrar este ticket ?',
		confirmContent: 'El siguiente ticket sera eliminado de los registros',
		confirmCanceltext: 'Cancelar',
		confirmOkaytext: 'Aceptar',
	};

	constructor(
		private _ticket: TicketService,
		private _modal: ModalService,
		private _confirmBox: ConfirmboxService,
    private _toast:ToastService
	) {}

	ngOnInit(): void {
		this.getTickets();
		this._ticket.GetSupportMembes().subscribe((data) => {
			data.forEach((item) => {
				this.UsersSupports.push(item);
			});
		});
	}

  ngOnChanges() {
    // changes.prop contains the old and the new value...
    this.getTickets();
  }
  // ngOnChanges():void {
  //   console.log("Works");
  //   this.getTickets();
  // }

	getTickets(): void {
		const role: string | null = sessionStorage.getItem('role');
		const userId: string | null = sessionStorage.getItem('userId');

		if (role != null && userId != null) {
			role === 'Admin'
				? this._ticket.getAllTickets(this.filters)
				: this._ticket.getAllUserTickets(this.filters, userId);
		}
	}

	open(content: any) {
		this._modal.showModal(content);
	}

  close() {
		this._modal.hideModal();
	}

	deleteTicket(ticket: ITicket): void {
		if (ticket?.id) {
			this.selectedTicket = ticket.id?.toString();
			this._confirmBox.showConfirmBox();
		}
	}

	confirmChange(event: boolean): void {
		this._confirmBox.confirmChange(event, this.selectedTicket);
    this.getTickets();
	}

	UpdateTicket(ticket: ITicket) {
    if (ticket.importance == 1) {
      ticket.importance = 1;
    }
    else if (ticket.importance == 2) {
      ticket.importance = 2;
    }
    else {
      ticket.importance = 3;
    }
		this._ticket.updateTicket(ticket).subscribe((data) => {
		  if (data) {
		    this._toast.ShowSuccess({title: "Exito!", message: "Se ha actualizado el ticket correctamente."});
        this.close();
		  }
		  else {
		    this._toast.ShowFailure({title: "Error!", message: "No se pudo actualizado el ticket."});
		  }
		});
	}
}
