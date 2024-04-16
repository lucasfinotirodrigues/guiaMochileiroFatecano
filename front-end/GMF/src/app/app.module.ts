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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
