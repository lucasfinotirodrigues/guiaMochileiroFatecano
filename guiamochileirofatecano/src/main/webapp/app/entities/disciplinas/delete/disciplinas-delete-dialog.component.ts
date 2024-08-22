import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisciplinas } from '../disciplinas.model';
import { DisciplinasService } from '../service/disciplinas.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './disciplinas-delete-dialog.component.html',
})
export class DisciplinasDeleteDialogComponent {
  disciplinas?: IDisciplinas;

  constructor(protected disciplinasService: DisciplinasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.disciplinasService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
