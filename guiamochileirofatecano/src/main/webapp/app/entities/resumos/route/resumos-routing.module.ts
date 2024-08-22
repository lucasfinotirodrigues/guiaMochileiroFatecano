import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ResumosComponent } from '../list/resumos.component';
import { ResumosDetailComponent } from '../detail/resumos-detail.component';
import { ResumosUpdateComponent } from '../update/resumos-update.component';
import { ResumosRoutingResolveService } from './resumos-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const resumosRoute: Routes = [
  {
    path: '',
    component: ResumosComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ResumosDetailComponent,
    resolve: {
      resumos: ResumosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ResumosUpdateComponent,
    resolve: {
      resumos: ResumosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ResumosUpdateComponent,
    resolve: {
      resumos: ResumosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(resumosRoute)],
  exports: [RouterModule],
})
export class ResumosRoutingModule {}
