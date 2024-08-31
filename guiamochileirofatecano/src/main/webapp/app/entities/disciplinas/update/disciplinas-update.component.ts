import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DisciplinasFormService, DisciplinasFormGroup } from './disciplinas-form.service';
import { IDisciplinas } from '../disciplinas.model';
import { DisciplinasService } from '../service/disciplinas.service';
import { ITermos } from 'app/entities/termos/termos.model';
import { TermosService } from 'app/entities/termos/service/termos.service';

@Component({
  selector: 'app-disciplinas-update',
  templateUrl: './disciplinas-update.component.html',
})
export class DisciplinasUpdateComponent implements OnInit {
  isSaving = false;
  disciplinas: IDisciplinas | null = null;

  termosSharedCollection: ITermos[] = [];

  editForm: DisciplinasFormGroup = this.disciplinasFormService.createDisciplinasFormGroup();

  constructor(
    protected disciplinasService: DisciplinasService,
    protected disciplinasFormService: DisciplinasFormService,
    protected termosService: TermosService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTermos = (o1: ITermos | null, o2: ITermos | null): boolean => this.termosService.compareTermos(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disciplinas }) => {
      this.disciplinas = disciplinas;
      if (disciplinas) {
        this.updateForm(disciplinas);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disciplinas = this.disciplinasFormService.getDisciplinas(this.editForm);
    if (disciplinas.id !== null) {
      this.subscribeToSaveResponse(this.disciplinasService.update(disciplinas));
    } else {
      this.subscribeToSaveResponse(this.disciplinasService.create(disciplinas));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisciplinas>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(disciplinas: IDisciplinas): void {
    this.disciplinas = disciplinas;
    this.disciplinasFormService.resetForm(this.editForm, disciplinas);

    this.termosSharedCollection = this.termosService.addTermosToCollectionIfMissing<ITermos>(
      this.termosSharedCollection,
      disciplinas.termos
    );
  }

  protected loadRelationshipsOptions(): void {
    this.termosService
      .query()
      .pipe(map((res: HttpResponse<ITermos[]>) => res.body ?? []))
      .pipe(map((termos: ITermos[]) => this.termosService.addTermosToCollectionIfMissing<ITermos>(termos, this.disciplinas?.termos)))
      .subscribe((termos: ITermos[]) => (this.termosSharedCollection = termos));
  }
}
