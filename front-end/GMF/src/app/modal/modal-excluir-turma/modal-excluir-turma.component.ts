import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-excluir-turma',
  templateUrl: './modal-excluir-turma.component.html',
  styleUrls: ['./modal-excluir-turma.component.scss']
})
export class ModalExcluirTurmaComponent {
constructor(
  protected modalService: NgbModal
) {}

  closeModal(): void {
    this.modalService.dismissAll();
  }

  rejeitarSolicitacao(): void {
    this.modalService.dismissAll();
  }
}
