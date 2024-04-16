import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEventosComponent } from 'src/app/modal/modal-eventos/modal-eventos.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private modalService: NgbModal
  ) {
  }

  MostrarSenha = false

  visibilidadeSenha(){
    this.MostrarSenha = !this.MostrarSenha
  }

  openModal(): void {
    this.modalService.open(ModalEventosComponent, {size: 'md', backdrop: 'static'})
  }
}
