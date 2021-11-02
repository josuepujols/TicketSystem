import { Injectable } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private _modalConfig: NgbModalConfig, private _modal: NgbModal) {
    _modalConfig.backdrop = 'static';
    _modalConfig.keyboard = true;
  }

  showModal(content: any) {
    this._modal.open(content);
  }

  hideModal() {
    this._modal.dismissAll();
  }

}
