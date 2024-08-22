import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITermos, NewTermos } from '../termos.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITermos for edit and NewTermosFormGroupInput for create.
 */
type TermosFormGroupInput = ITermos | PartialWithRequiredKeyOf<NewTermos>;

type TermosFormDefaults = Pick<NewTermos, 'id'>;

type TermosFormGroupContent = {
  id: FormControl<ITermos['id'] | NewTermos['id']>;
  nome: FormControl<ITermos['nome']>;
  semestre: FormControl<ITermos['semestre']>;
  ano: FormControl<ITermos['ano']>;
};

export type TermosFormGroup = FormGroup<TermosFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TermosFormService {
  createTermosFormGroup(termos: TermosFormGroupInput = { id: null }): TermosFormGroup {
    const termosRawValue = {
      ...this.getFormDefaults(),
      ...termos,
    };
    return new FormGroup<TermosFormGroupContent>({
      id: new FormControl(
        { value: termosRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(termosRawValue.nome, {
        validators: [Validators.required],
      }),
      semestre: new FormControl(termosRawValue.semestre, {
        validators: [Validators.required],
      }),
      ano: new FormControl(termosRawValue.ano, {
        validators: [Validators.required],
      }),
    });
  }

  getTermos(form: TermosFormGroup): ITermos | NewTermos {
    return form.getRawValue() as ITermos | NewTermos;
  }

  resetForm(form: TermosFormGroup, termos: TermosFormGroupInput): void {
    const termosRawValue = { ...this.getFormDefaults(), ...termos };
    form.reset(
      {
        ...termosRawValue,
        id: { value: termosRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TermosFormDefaults {
    return {
      id: null,
    };
  }
}
