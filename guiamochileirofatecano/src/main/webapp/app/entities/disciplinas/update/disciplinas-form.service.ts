import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDisciplinas, NewDisciplinas } from '../disciplinas.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDisciplinas for edit and NewDisciplinasFormGroupInput for create.
 */
type DisciplinasFormGroupInput = IDisciplinas | PartialWithRequiredKeyOf<NewDisciplinas>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDisciplinas | NewDisciplinas> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

type DisciplinasFormRawValue = FormValueOf<IDisciplinas>;

type NewDisciplinasFormRawValue = FormValueOf<NewDisciplinas>;

type DisciplinasFormDefaults = Pick<NewDisciplinas, 'id' | 'createdDate'>;

type DisciplinasFormGroupContent = {
  id: FormControl<DisciplinasFormRawValue['id'] | NewDisciplinas['id']>;
  nome: FormControl<DisciplinasFormRawValue['nome']>;
  createdDate: FormControl<DisciplinasFormRawValue['createdDate']>;
  termos: FormControl<DisciplinasFormRawValue['termos']>;
};

export type DisciplinasFormGroup = FormGroup<DisciplinasFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DisciplinasFormService {
  createDisciplinasFormGroup(disciplinas: DisciplinasFormGroupInput = { id: null }): DisciplinasFormGroup {
    const disciplinasRawValue = this.convertDisciplinasToDisciplinasRawValue({
      ...this.getFormDefaults(),
      ...disciplinas,
    });
    return new FormGroup<DisciplinasFormGroupContent>({
      id: new FormControl(
        { value: disciplinasRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(disciplinasRawValue.nome, {
        validators: [Validators.required],
      }),
      createdDate: new FormControl(disciplinasRawValue.createdDate, {
        validators: [Validators.required],
      }),
      termos: new FormControl(disciplinasRawValue.termos),
    });
  }

  getDisciplinas(form: DisciplinasFormGroup): IDisciplinas | NewDisciplinas {
    return this.convertDisciplinasRawValueToDisciplinas(form.getRawValue() as DisciplinasFormRawValue | NewDisciplinasFormRawValue);
  }

  resetForm(form: DisciplinasFormGroup, disciplinas: DisciplinasFormGroupInput): void {
    const disciplinasRawValue = this.convertDisciplinasToDisciplinasRawValue({ ...this.getFormDefaults(), ...disciplinas });
    form.reset(
      {
        ...disciplinasRawValue,
        id: { value: disciplinasRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DisciplinasFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
    };
  }

  private convertDisciplinasRawValueToDisciplinas(
    rawDisciplinas: DisciplinasFormRawValue | NewDisciplinasFormRawValue
  ): IDisciplinas | NewDisciplinas {
    return {
      ...rawDisciplinas,
      createdDate: dayjs(rawDisciplinas.createdDate, DATE_TIME_FORMAT),
    };
  }

  private convertDisciplinasToDisciplinasRawValue(
    disciplinas: IDisciplinas | (Partial<NewDisciplinas> & DisciplinasFormDefaults)
  ): DisciplinasFormRawValue | PartialWithRequiredKeyOf<NewDisciplinasFormRawValue> {
    return {
      ...disciplinas,
      createdDate: disciplinas.createdDate ? disciplinas.createdDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
