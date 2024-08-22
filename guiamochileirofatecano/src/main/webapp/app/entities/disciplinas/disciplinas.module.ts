import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DisciplinasComponent } from './list/disciplinas.component';
import { DisciplinasDetailComponent } from './detail/disciplinas-detail.component';
import { DisciplinasUpdateComponent } from './update/disciplinas-update.component';
import { DisciplinasDeleteDialogComponent } from './delete/disciplinas-delete-dialog.component';
import { DisciplinasRoutingModule } from './route/disciplinas-routing.module';

@NgModule({
  imports: [SharedModule, DisciplinasRoutingModule],
  declarations: [DisciplinasComponent, DisciplinasDetailComponent, DisciplinasUpdateComponent, DisciplinasDeleteDialogComponent],
})
export class DisciplinasModule {}
