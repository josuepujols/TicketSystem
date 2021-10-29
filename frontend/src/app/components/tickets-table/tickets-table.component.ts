import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilter } from 'src/app/Interfaces/ipagination-filter';
import { ITicket } from 'src/app/Interfaces/iticket';
import { TicketService } from 'src/app/services/ticket/ticket.service';

import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
	selector: 'app-tickets-table',
	templateUrl: './tickets-table.component.html',
	styleUrls: ['./tickets-table.component.scss'],
})
export class TicketsTableComponent implements OnInit {
	results$: Observable<IPagedData | null> = this._ticket.ticketsObserver$;
	filters: IPaginationFilter = {
		pageNumber: 1,
		pageSize: 10,
		searchTerm: '',
	};

	faEdit = faEdit;
	faEye = faEye;
	faTrash = faTrash;

	constructor(private _ticket: TicketService, private _modal: ModalService) {}

	ngOnInit(): void {
		this.getTickets();
	}

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

}
