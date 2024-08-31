import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TermosFormService, TermosFormGroup } from './termos-form.service';
import { ITermos } from '../termos.model';
import { TermosService } from '../service/termos.service';
import { NumeroTermo } from 'app/entities/enumerations/numero-termo.model';
import { NumeroSemestre } from 'app/entities/enumerations/numero-semestre.model';

@Component({
  selector: 'app-termos-update',
  templateUrl: './termos-update.component.html',
})
export class TermosUpdateComponent implements OnInit {
  isSaving = false;
  termos: ITermos | null = null;
  numeroTermoValues = Object.keys(NumeroTermo);
  numeroSemestreValues = Object.keys(NumeroSemestre);

  editForm: TermosFormGroup = this.termosFormService.createTermosFormGroup();

  constructor(
    protected termosService: TermosService,
    protected termosFormService: TermosFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ termos }) => {
      this.termos = termos;
      if (termos) {
        this.updateForm(termos);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const termos = this.termosFormService.getTermos(this.editForm);
    if (termos.id !== null) {
      this.subscribeToSaveResponse(this.termosService.update(termos));
    } else {
      this.subscribeToSaveResponse(this.termosService.create(termos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITermos>>): void {
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

  protected updateForm(termos: ITermos): void {
    this.termos = termos;
    this.termosFormService.resetForm(this.editForm, termos);
  }
}
