import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-eventos',
  templateUrl: './modal-eventos.component.html',
  styleUrls: ['./modal-eventos.component.scss']
})
export class ModalEventosComponent {
  constructor(
    private modalService: NgbModal
  ) {
  }

  lista = [
    {image: '../../../assets/modalEvento.svg'},
    {image: '../../../assets/modalEvento2.svg'},
    {image: '../../../assets/modalEvento3.svg'}
  ]
  close(){
    this.modalService.dismissAll();
  }
}

