import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ValoresComponent } from './pages/valores/valores.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'valores', component: ValoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
