import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ValoresComponent } from './pages/valores/valores.component';
import { TermosComponent } from './pages/termos/termos.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'valores', component: ValoresComponent},
  { path: 'termos', component: TermosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
