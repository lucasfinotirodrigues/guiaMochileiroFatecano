import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ResumosComponent } from './list/resumos.component';
import { ResumosDetailComponent } from './detail/resumos-detail.component';
import { ResumosUpdateComponent } from './update/resumos-update.component';
import { ResumosDeleteDialogComponent } from './delete/resumos-delete-dialog.component';
import { ResumosRoutingModule } from './route/resumos-routing.module';

@NgModule({
  imports: [SharedModule, ResumosRoutingModule],
  declarations: [ResumosComponent, ResumosDetailComponent, ResumosUpdateComponent, ResumosDeleteDialogComponent],
})
export class ResumosModule {}
