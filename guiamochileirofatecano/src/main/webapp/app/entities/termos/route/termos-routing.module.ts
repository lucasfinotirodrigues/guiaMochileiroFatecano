import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TermosComponent } from '../list/termos.component';
import { TermosDetailComponent } from '../detail/termos-detail.component';
import { TermosUpdateComponent } from '../update/termos-update.component';
import { TermosRoutingResolveService } from './termos-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const termosRoute: Routes = [
  {
    path: '',
    component: TermosComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TermosDetailComponent,
    resolve: {
      termos: TermosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TermosUpdateComponent,
    resolve: {
      termos: TermosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TermosUpdateComponent,
    resolve: {
      termos: TermosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(termosRoute)],
  exports: [RouterModule],
})
export class TermosRoutingModule {}
