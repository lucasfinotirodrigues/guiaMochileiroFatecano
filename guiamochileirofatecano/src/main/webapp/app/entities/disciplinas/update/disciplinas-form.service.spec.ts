import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../disciplinas.test-samples';

import { DisciplinasFormService } from './disciplinas-form.service';

describe('Disciplinas Form Service', () => {
  let service: DisciplinasFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisciplinasFormService);
  });

  describe('Service methods', () => {
    describe('createDisciplinasFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDisciplinasFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            createdDate: expect.any(Object),
            termos: expect.any(Object),
          })
        );
      });

      it('passing IDisciplinas should create a new form with FormGroup', () => {
        const formGroup = service.createDisciplinasFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            createdDate: expect.any(Object),
            termos: expect.any(Object),
          })
        );
      });
    });

    describe('getDisciplinas', () => {
      it('should return NewDisciplinas for default Disciplinas initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDisciplinasFormGroup(sampleWithNewData);

        const disciplinas = service.getDisciplinas(formGroup) as any;

        expect(disciplinas).toMatchObject(sampleWithNewData);
      });

      it('should return NewDisciplinas for empty Disciplinas initial value', () => {
        const formGroup = service.createDisciplinasFormGroup();

        const disciplinas = service.getDisciplinas(formGroup) as any;

        expect(disciplinas).toMatchObject({});
      });

      it('should return IDisciplinas', () => {
        const formGroup = service.createDisciplinasFormGroup(sampleWithRequiredData);

        const disciplinas = service.getDisciplinas(formGroup) as any;

        expect(disciplinas).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDisciplinas should not enable id FormControl', () => {
        const formGroup = service.createDisciplinasFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDisciplinas should disable id FormControl', () => {
        const formGroup = service.createDisciplinasFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
