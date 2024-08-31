import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProjetosComponent } from '../list/projetos.component';
import { ProjetosDetailComponent } from '../detail/projetos-detail.component';
import { ProjetosUpdateComponent } from '../update/projetos-update.component';
import { ProjetosRoutingResolveService } from './projetos-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const projetosRoute: Routes = [
  {
    path: '',
    component: ProjetosComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProjetosDetailComponent,
    resolve: {
      projetos: ProjetosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProjetosUpdateComponent,
    resolve: {
      projetos: ProjetosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProjetosUpdateComponent,
    resolve: {
      projetos: ProjetosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(projetosRoute)],
  exports: [RouterModule],
})
export class ProjetosRoutingModule {}
