import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITicket } from '../../Interfaces/iticket';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilter } from 'src/app/Interfaces/ipagination-filter';
import { ISupports } from 'src/app/Interfaces/isupport';

@Injectable({
	providedIn: 'root',
})
export class TicketService {
	private endPoint = environment.api_url + 'tickets';
	private ticketSource = new ReplaySubject<IPagedData | null>();
	public ticketsObserver$ = this.ticketSource.asObservable();

	constructor(private $http: HttpClient) {}

	// This limits user to have access to only their assign tickets
	getAllUserTickets(
		filters: IPaginationFilter,
		userId: string
	): Observable<IPagedData> {
		const params = new HttpParams()
			.set('pageNumber', filters.pageNumber)
			.set('pageSize', filters.pageSize)
			.set('searchTerm', filters.searchTerm);

		return this.$http.get<IPagedData>(`${this.endPoint}/${userId}/all?`, {
			params: params,
		});
	}

	// For Admin Roles only
	getAllTickets(filters: IPaginationFilter): void {
		const params = new HttpParams()
			.set('pageNumber', filters.pageNumber)
			.set('pageSize', filters.pageSize)
			.set('searchTerm', filters.searchTerm);

		this.$http
			.get<IPagedData>(`${this.endPoint}`, {
				params: params,
			})
			.subscribe((data: IPagedData) => {
				console.log(data);
				this.ticketSource.next(data);
			});
	}

  GetSupportMembes(): Observable<ISupports[]> {
    return this.$http.get<ISupports[]>(`${this.endPoint}/personal`);
  }

	createTicket(model: ITicket): Observable<boolean> {
		return this.$http.post<boolean>(`${this.endPoint}/create`, model);
	}

	getTicketById(id: string): Observable<ITicket> {
		return this.$http.get<ITicket>(`${this.endPoint}/${id}`);
	}

	updateTicket(model: ITicket): Observable<ITicket> {
		return this.$http.put<ITicket>(`${this.endPoint}/edit/${model.id}`, model);
	}

	deleteTicket(id: string): void {
		this.$http
			.delete(`${this.endPoint}/remove/${id}`)
			.subscribe((data) => console.log(data));
	}
}
