import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IResumos, NewResumos } from '../resumos.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IResumos for edit and NewResumosFormGroupInput for create.
 */
type ResumosFormGroupInput = IResumos | PartialWithRequiredKeyOf<NewResumos>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IResumos | NewResumos> = Omit<T, 'createdDate'> & {
  createdDate?: string | null;
};

type ResumosFormRawValue = FormValueOf<IResumos>;

type NewResumosFormRawValue = FormValueOf<NewResumos>;

type ResumosFormDefaults = Pick<NewResumos, 'id' | 'createdDate'>;

type ResumosFormGroupContent = {
  id: FormControl<ResumosFormRawValue['id'] | NewResumos['id']>;
  assunto: FormControl<ResumosFormRawValue['assunto']>;
  resumo: FormControl<ResumosFormRawValue['resumo']>;
  createdDate: FormControl<ResumosFormRawValue['createdDate']>;
  disciplinas: FormControl<ResumosFormRawValue['disciplinas']>;
};

export type ResumosFormGroup = FormGroup<ResumosFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ResumosFormService {
  createResumosFormGroup(resumos: ResumosFormGroupInput = { id: null }): ResumosFormGroup {
    const resumosRawValue = this.convertResumosToResumosRawValue({
      ...this.getFormDefaults(),
      ...resumos,
    });
    return new FormGroup<ResumosFormGroupContent>({
      id: new FormControl(
        { value: resumosRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      assunto: new FormControl(resumosRawValue.assunto, {
        validators: [Validators.required],
      }),
      resumo: new FormControl(resumosRawValue.resumo, {
        validators: [Validators.required],
      }),
      createdDate: new FormControl(resumosRawValue.createdDate, {
        validators: [Validators.required],
      }),
      disciplinas: new FormControl(resumosRawValue.disciplinas),
    });
  }

  getResumos(form: ResumosFormGroup): IResumos | NewResumos {
    return this.convertResumosRawValueToResumos(form.getRawValue() as ResumosFormRawValue | NewResumosFormRawValue);
  }

  resetForm(form: ResumosFormGroup, resumos: ResumosFormGroupInput): void {
    const resumosRawValue = this.convertResumosToResumosRawValue({ ...this.getFormDefaults(), ...resumos });
    form.reset(
      {
        ...resumosRawValue,
        id: { value: resumosRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ResumosFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
    };
  }

  private convertResumosRawValueToResumos(rawResumos: ResumosFormRawValue | NewResumosFormRawValue): IResumos | NewResumos {
    return {
      ...rawResumos,
      createdDate: dayjs(rawResumos.createdDate, DATE_TIME_FORMAT),
    };
  }

  private convertResumosToResumosRawValue(
    resumos: IResumos | (Partial<NewResumos> & ResumosFormDefaults)
  ): ResumosFormRawValue | PartialWithRequiredKeyOf<NewResumosFormRawValue> {
    return {
      ...resumos,
      createdDate: resumos.createdDate ? resumos.createdDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
