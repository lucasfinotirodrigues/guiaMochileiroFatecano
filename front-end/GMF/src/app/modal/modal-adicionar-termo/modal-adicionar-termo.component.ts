import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-adicionar-termo',
  templateUrl: './modal-adicionar-termo.component.html',
  styleUrls: ['./modal-adicionar-termo.component.scss']
})
export class ModalAdicionarTermoComponent {
  constructor(
    private modalService: NgbModal
  ) {}

  close():void {
    this.modalService.dismissAll()
  }
}
