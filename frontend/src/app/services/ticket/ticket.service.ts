import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITicket } from '../../Interfaces/iticket';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilter } from 'src/app/Interfaces/ipagination-filter';

@Injectable({
	providedIn: 'root',
})
export class TicketService {
	private endPoint = environment.api_url + 'ticket';

	constructor(private $http: HttpClient) {}

	getAllTickets(
		filters: IPaginationFilter,
		userId: string
	): Observable<IPagedData> {
		return this.$http.get<IPagedData>(`${this.endPoint}/${userId}/all`);
	}

	createTicket(model: ITicket): Observable<boolean> {
		return this.$http.post<boolean>(`${this.endPoint}/create`, model);
	}

	getTicketById(id: string): Observable<ITicket> {
		return this.$http.get<ITicket>(`${this.endPoint}/${id}`);
	}

	updateTicket(model: ITicket): void {
		this.$http
			.put(`${this.endPoint}/edit/${model.id}`, model)
			.subscribe((data) => console.log(data));
	}

	deleteTicket(id: string): void {
		this.$http
			.delete(`${this.endPoint}/remove/${id}`)
			.subscribe((data) => console.log(data));
	}
}
