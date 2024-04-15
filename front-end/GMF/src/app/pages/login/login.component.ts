import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  MostrarSenha = false

  visibilidadeSenha(){
    this.MostrarSenha = !this.MostrarSenha
  }
}
