import { ToastService } from './../../services/toast/toast.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IPaginationFilter } from 'src/app/Interfaces/ipagination-filter';
import { ITicket } from 'src/app/Interfaces/iticket';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Router } from '@angular/router';

import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ConfirmboxService } from 'src/app/services/confirmbox/confirmbox.service';

@Component({
	selector: 'app-tickets-table',
	templateUrl: './tickets-table.component.html',
	styleUrls: ['./tickets-table.component.scss'],
})
export class TicketsTableComponent implements OnInit {
	results$: Observable<IPagedData | null> = this._ticket.ticketsObserver$;
	public UsersSupports: any[] = [];
  public IsAdmin: boolean;
  public SelectString: string;
  public TicketsLength:number;

	filters: IPaginationFilter = {
		pageNumber: 1,
		pageSize: 5,
		searchTerm: '',
    numberStatus: 0
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
    private _toast:ToastService,
    private router: Router
	) {
    this.IsAdmin = false;
    this.SelectString = "Filtrar por Estatus";
    this.TicketsLength = 0;
  }


	ngOnInit(): void {
		this.getTickets();
		this._ticket.GetSupportMembes().subscribe((data) => {
			data.forEach((item) => {
				this.UsersSupports.push(item);
			});
		});
	}

	getTickets(): void {
    console.log(this.filters);
		const role: string | null = sessionStorage.getItem('role');
		const userId: string | null = sessionStorage.getItem('userId');

		if (role != null && userId != null) {
      if (role === 'Admin') {
        this._ticket.getAllTickets(this.filters);
        this.IsAdmin = true;
      }
      else {
        this._ticket.getAllUserTickets(this.filters, userId);
        this.IsAdmin = false;
      }
		}

    this.results$.subscribe(data => {
      this.TicketsLength = data?.totalCount as number;
    });
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

	confirmChange(event: boolean, item: ITicket): void {
    let index:any = -1;
		this._confirmBox.confirmChange(event, this.selectedTicket);
    this.results$.subscribe(data => {
      index = data?.records.indexOf(item);
      if (index > -1) {
        data?.records.splice(index, 1);
        console.log(data?.records);
        this.ngOnInit();

        // this.router.navigateByUrl('/dashboard' + sessionStorage.getItem('username'), { skipLocationChange: false }).then(() => {
        //   this.router.navigate(['dashboard/' + sessionStorage.getItem('username')]);
        // });
        window.location.reload();
      }
    });
	}


	UpdateTicket(ticket: ITicket, IsStatus: boolean) {

    //Compruebo si voy a actualizar solo el status
    if (IsStatus) {
      if (ticket.isCompleted) {
        ticket.isCompleted = false;
      }
      else {
        ticket.isCompleted = true;
      }
    }

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
        this.ngOnInit();
		  }
		  else {
		    this._toast.ShowFailure({title: "Error!", message: "No se pudo actualizado el ticket."});
		  }
		});
	}
}
