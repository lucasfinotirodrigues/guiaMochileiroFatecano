import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-adicionar-turma',
  templateUrl: './modal-adicionar-turma.component.html',
  styleUrls: ['./modal-adicionar-turma.component.scss']
})
export class ModalAdicionarTurmaComponent {
  constructor(
    private modalService: NgbModal
  ) {}

  close():void {
    this.modalService.dismissAll()
  }
}
