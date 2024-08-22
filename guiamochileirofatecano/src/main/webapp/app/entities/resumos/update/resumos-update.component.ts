import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ResumosFormService, ResumosFormGroup } from './resumos-form.service';
import { IResumos } from '../resumos.model';
import { ResumosService } from '../service/resumos.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDisciplinas } from 'app/entities/disciplinas/disciplinas.model';
import { DisciplinasService } from 'app/entities/disciplinas/service/disciplinas.service';

@Component({
  selector: 'app-resumos-update',
  templateUrl: './resumos-update.component.html',
})
export class ResumosUpdateComponent implements OnInit {
  isSaving = false;
  resumos: IResumos | null = null;

  disciplinasSharedCollection: IDisciplinas[] = [];

  editForm: ResumosFormGroup = this.resumosFormService.createResumosFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected resumosService: ResumosService,
    protected resumosFormService: ResumosFormService,
    protected disciplinasService: DisciplinasService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDisciplinas = (o1: IDisciplinas | null, o2: IDisciplinas | null): boolean => this.disciplinasService.compareDisciplinas(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resumos }) => {
      this.resumos = resumos;
      if (resumos) {
        this.updateForm(resumos);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gmfApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resumos = this.resumosFormService.getResumos(this.editForm);
    if (resumos.id !== null) {
      this.subscribeToSaveResponse(this.resumosService.update(resumos));
    } else {
      this.subscribeToSaveResponse(this.resumosService.create(resumos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResumos>>): void {
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

  protected updateForm(resumos: IResumos): void {
    this.resumos = resumos;
    this.resumosFormService.resetForm(this.editForm, resumos);

    this.disciplinasSharedCollection = this.disciplinasService.addDisciplinasToCollectionIfMissing<IDisciplinas>(
      this.disciplinasSharedCollection,
      resumos.disciplinas
    );
  }

  protected loadRelationshipsOptions(): void {
    this.disciplinasService
      .query()
      .pipe(map((res: HttpResponse<IDisciplinas[]>) => res.body ?? []))
      .pipe(
        map((disciplinas: IDisciplinas[]) =>
          this.disciplinasService.addDisciplinasToCollectionIfMissing<IDisciplinas>(disciplinas, this.resumos?.disciplinas)
        )
      )
      .subscribe((disciplinas: IDisciplinas[]) => (this.disciplinasSharedCollection = disciplinas));
  }
}
