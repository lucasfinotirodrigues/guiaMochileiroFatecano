import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  mostrarSenha = false;
  mostrarConfirmSenha = false;

  visibilidadeSenha(): void{
    this.mostrarSenha = !this.mostrarSenha;
  }

  visibilidadeConfirmSenha(): void {
    this.mostrarConfirmSenha = !this.mostrarConfirmSenha;
  }
}
