import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TermosComponent } from './list/termos.component';
import { TermosDetailComponent } from './detail/termos-detail.component';
import { TermosUpdateComponent } from './update/termos-update.component';
import { TermosDeleteDialogComponent } from './delete/termos-delete-dialog.component';
import { TermosRoutingModule } from './route/termos-routing.module';

@NgModule({
  imports: [SharedModule, TermosRoutingModule],
  declarations: [TermosComponent, TermosDetailComponent, TermosUpdateComponent, TermosDeleteDialogComponent],
})
export class TermosModule {}
