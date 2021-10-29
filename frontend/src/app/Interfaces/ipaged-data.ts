import { ITicket } from './iticket';

export interface IPagedData {
	records: ITicket[];
	totalCount: number;
	pageNumber: number;
	pageSize: number;
}
