import { Routes } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

const routes: Routes = [
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.route'),
    title: 'Guia do Mochileiro Fatecano',
  },
  {
    path: 'docs',
    loadComponent: () => import('./docs/docs.component'),
    title: 'Guia do Mochileiro Fatecano',
  },
  {
    path: 'configuration',
    loadComponent: () => import('./configuration/configuration.component'),
    title: 'Guia do Mochileiro Fatecano',
  },
  {
    path: 'health',
    loadComponent: () => import('./health/health.component'),
    title: 'Guia do Mochileiro Fatecano',
  },
  {
    path: 'logs',
    loadComponent: () => import('./logs/logs.component'),
    title: 'Guia do Mochileiro Fatecano',
  },
  {
    path: 'metrics',
    loadComponent: () => import('./metrics/metrics.component'),
    title: 'Guia do Mochileiro Fatecano',
  },
  /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
];

export default routes;
