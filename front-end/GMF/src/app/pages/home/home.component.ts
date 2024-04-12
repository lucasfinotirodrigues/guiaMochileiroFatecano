import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEventosComponent } from 'src/app/modal/modal-eventos/modal-eventos.component';
import { ModalResumosComponent } from 'src/app/modal/modal-resumos/modal-resumos.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private modalService: NgbModal
  ) {

  }

  openModalEventos():void {
    this.modalService.open(ModalEventosComponent, {size: 'md', backdrop: 'static'})
  }

  openModalResumo():void {
    this.modalService.open(ModalResumosComponent, {size: 'md', backdrop: 'static'})
  }
}
