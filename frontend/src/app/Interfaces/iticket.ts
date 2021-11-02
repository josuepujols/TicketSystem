export interface ITicket {
	id?: string;
	title: string;
	description: string;
	importance: number;
	userId?: string;
	assignTo: string | null;
	isCompleted?: boolean;
	created?: string;
}
