import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'termos',
        data: { pageTitle: 'gmfApp.termos.home.title' },
        loadChildren: () => import('./termos/termos.module').then(m => m.TermosModule),
      },
      {
        path: 'disciplinas',
        data: { pageTitle: 'gmfApp.disciplinas.home.title' },
        loadChildren: () => import('./disciplinas/disciplinas.module').then(m => m.DisciplinasModule),
      },
      {
        path: 'resumos',
        data: { pageTitle: 'gmfApp.resumos.home.title' },
        loadChildren: () => import('./resumos/resumos.module').then(m => m.ResumosModule),
      },
      {
        path: 'projetos',
        data: { pageTitle: 'gmfApp.projetos.home.title' },
        loadChildren: () => import('./projetos/projetos.module').then(m => m.ProjetosModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
