import { Component } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAdicionarTurmaComponent } from 'src/app/modal/modal-adicionar-turma/modal-adicionar-turma.component';
import { ModalEventosComponent } from 'src/app/modal/modal-eventos/modal-eventos.component';
import { ModalResumosComponent } from 'src/app/modal/modal-resumos/modal-resumos.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbDropdownConfig],
})
export class HomeComponent {
  constructor(
    private modalService: NgbModal,
    private config: NgbDropdownConfig
  ) {
  config.placement = 'top-start';
  config.autoClose = false;
  }

  cicloUm = [
    { termo: '1° Termo', cor: '#E2F4C5' },
    { termo: '2° Termo', cor: '#EEE7DA' },
    { termo: '3° Termo', cor: '#A5DD9B' },
  ]

  cicloDois = [
    { termo: '4° Termo', cor: '#C5EBAA' },
    { termo: '5° Termo', cor: '#FFFFDD' },
    { termo: '6° Termo', cor: '#AFC8AD' }
  ]

  openModalEventos():void {
    this.modalService.open(ModalEventosComponent, {size: 'md', backdrop: 'static'})
  }

  openModalResumo():void {
    this.modalService.open(ModalResumosComponent, {size: 'md', backdrop: 'static'})
  }

  openModalTurma():void {
    this.modalService.open(ModalAdicionarTurmaComponent, {size: 'md', backdrop: 'static'})
  }
}
