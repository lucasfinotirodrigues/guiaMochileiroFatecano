import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProjetos, NewProjetos } from '../projetos.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProjetos for edit and NewProjetosFormGroupInput for create.
 */
type ProjetosFormGroupInput = IProjetos | PartialWithRequiredKeyOf<NewProjetos>;

type ProjetosFormDefaults = Pick<NewProjetos, 'id'>;

type ProjetosFormGroupContent = {
  id: FormControl<IProjetos['id'] | NewProjetos['id']>;
  nome: FormControl<IProjetos['nome']>;
  assunto: FormControl<IProjetos['assunto']>;
  disciplinas: FormControl<IProjetos['disciplinas']>;
};

export type ProjetosFormGroup = FormGroup<ProjetosFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProjetosFormService {
  createProjetosFormGroup(projetos: ProjetosFormGroupInput = { id: null }): ProjetosFormGroup {
    const projetosRawValue = {
      ...this.getFormDefaults(),
      ...projetos,
    };
    return new FormGroup<ProjetosFormGroupContent>({
      id: new FormControl(
        { value: projetosRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nome: new FormControl(projetosRawValue.nome, {
        validators: [Validators.required],
      }),
      assunto: new FormControl(projetosRawValue.assunto, {
        validators: [Validators.required],
      }),
      disciplinas: new FormControl(projetosRawValue.disciplinas),
    });
  }

  getProjetos(form: ProjetosFormGroup): IProjetos | NewProjetos {
    return form.getRawValue() as IProjetos | NewProjetos;
  }

  resetForm(form: ProjetosFormGroup, projetos: ProjetosFormGroupInput): void {
    const projetosRawValue = { ...this.getFormDefaults(), ...projetos };
    form.reset(
      {
        ...projetosRawValue,
        id: { value: projetosRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProjetosFormDefaults {
    return {
      id: null,
    };
  }
}
