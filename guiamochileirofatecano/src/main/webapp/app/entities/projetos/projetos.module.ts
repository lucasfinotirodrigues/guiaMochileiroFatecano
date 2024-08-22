import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProjetosComponent } from './list/projetos.component';
import { ProjetosDetailComponent } from './detail/projetos-detail.component';
import { ProjetosUpdateComponent } from './update/projetos-update.component';
import { ProjetosDeleteDialogComponent } from './delete/projetos-delete-dialog.component';
import { ProjetosRoutingModule } from './route/projetos-routing.module';

@NgModule({
  imports: [SharedModule, ProjetosRoutingModule],
  declarations: [ProjetosComponent, ProjetosDetailComponent, ProjetosUpdateComponent, ProjetosDeleteDialogComponent],
})
export class ProjetosModule {}
