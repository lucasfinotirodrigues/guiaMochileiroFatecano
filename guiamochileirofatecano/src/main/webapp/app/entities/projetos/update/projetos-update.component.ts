import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProjetosFormService, ProjetosFormGroup } from './projetos-form.service';
import { IProjetos } from '../projetos.model';
import { ProjetosService } from '../service/projetos.service';
import { IDisciplinas } from 'app/entities/disciplinas/disciplinas.model';
import { DisciplinasService } from 'app/entities/disciplinas/service/disciplinas.service';

@Component({
  selector: 'app-projetos-update',
  templateUrl: './projetos-update.component.html',
})
export class ProjetosUpdateComponent implements OnInit {
  isSaving = false;
  projetos: IProjetos | null = null;

  disciplinasSharedCollection: IDisciplinas[] = [];

  editForm: ProjetosFormGroup = this.projetosFormService.createProjetosFormGroup();

  constructor(
    protected projetosService: ProjetosService,
    protected projetosFormService: ProjetosFormService,
    protected disciplinasService: DisciplinasService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDisciplinas = (o1: IDisciplinas | null, o2: IDisciplinas | null): boolean => this.disciplinasService.compareDisciplinas(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projetos }) => {
      this.projetos = projetos;
      if (projetos) {
        this.updateForm(projetos);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projetos = this.projetosFormService.getProjetos(this.editForm);
    if (projetos.id !== null) {
      this.subscribeToSaveResponse(this.projetosService.update(projetos));
    } else {
      this.subscribeToSaveResponse(this.projetosService.create(projetos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjetos>>): void {
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

  protected updateForm(projetos: IProjetos): void {
    this.projetos = projetos;
    this.projetosFormService.resetForm(this.editForm, projetos);

    this.disciplinasSharedCollection = this.disciplinasService.addDisciplinasToCollectionIfMissing<IDisciplinas>(
      this.disciplinasSharedCollection,
      projetos.disciplinas
    );
  }

  protected loadRelationshipsOptions(): void {
    this.disciplinasService
      .query()
      .pipe(map((res: HttpResponse<IDisciplinas[]>) => res.body ?? []))
      .pipe(
        map((disciplinas: IDisciplinas[]) =>
          this.disciplinasService.addDisciplinasToCollectionIfMissing<IDisciplinas>(disciplinas, this.projetos?.disciplinas)
        )
      )
      .subscribe((disciplinas: IDisciplinas[]) => (this.disciplinasSharedCollection = disciplinas));
  }
}
