export interface ITicket {
	id?: string;
	title: string;
	description: string;
	importance: number;
	userId?: string;
	assignTo?: string;
	isCompleted?: boolean;
  UserName:string;
	created?: string;
}
