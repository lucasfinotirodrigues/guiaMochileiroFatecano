import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DisciplinasComponent } from '../list/disciplinas.component';
import { DisciplinasDetailComponent } from '../detail/disciplinas-detail.component';
import { DisciplinasUpdateComponent } from '../update/disciplinas-update.component';
import { DisciplinasRoutingResolveService } from './disciplinas-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const disciplinasRoute: Routes = [
  {
    path: '',
    component: DisciplinasComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DisciplinasDetailComponent,
    resolve: {
      disciplinas: DisciplinasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DisciplinasUpdateComponent,
    resolve: {
      disciplinas: DisciplinasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DisciplinasUpdateComponent,
    resolve: {
      disciplinas: DisciplinasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(disciplinasRoute)],
  exports: [RouterModule],
})
export class DisciplinasRoutingModule {}
