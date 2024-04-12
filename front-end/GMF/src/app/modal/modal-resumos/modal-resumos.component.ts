import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-resumos',
  templateUrl: './modal-resumos.component.html',
  styleUrls: ['./modal-resumos.component.scss']
})
export class ModalResumosComponent {

  constructor(
    private modalService: NgbModal
  ) {
  }
  close(){
    this.modalService.dismissAll();
  }
}
