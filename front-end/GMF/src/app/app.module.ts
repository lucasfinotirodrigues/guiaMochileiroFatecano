import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalEventosComponent } from './modal/modal-eventos/modal-eventos.component';
import { ModalResumosComponent } from './modal/modal-resumos/modal-resumos.component';
import { ValoresComponent } from './pages/valores/valores.component';
import { TermosComponent } from './pages/termos/termos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ModalAdicionarTurmaComponent } from './modal/modal-adicionar-turma/modal-adicionar-turma.component';
import { ModalAdicionarTermoComponent } from './modal/modal-adicionar-termo/modal-adicionar-termo.component';
import { ModalExcluirTermoComponent } from './modal/modal-excluir-termo/modal-excluir-termo.component';
import { ModalExcluirTurmaComponent } from './modal/modal-excluir-turma/modal-excluir-turma.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ModalEventosComponent,
    ModalResumosComponent,
    ValoresComponent,
    TermosComponent,
    LoginComponent,
    RegisterComponent,
    ModalAdicionarTurmaComponent,
    ModalAdicionarTermoComponent,
    ModalExcluirTermoComponent,
    ModalExcluirTurmaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
