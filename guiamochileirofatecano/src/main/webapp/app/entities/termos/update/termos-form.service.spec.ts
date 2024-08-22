import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../termos.test-samples';

import { TermosFormService } from './termos-form.service';

describe('Termos Form Service', () => {
  let service: TermosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermosFormService);
  });

  describe('Service methods', () => {
    describe('createTermosFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTermosFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            semestre: expect.any(Object),
            ano: expect.any(Object),
          })
        );
      });

      it('passing ITermos should create a new form with FormGroup', () => {
        const formGroup = service.createTermosFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            semestre: expect.any(Object),
            ano: expect.any(Object),
          })
        );
      });
    });

    describe('getTermos', () => {
      it('should return NewTermos for default Termos initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTermosFormGroup(sampleWithNewData);

        const termos = service.getTermos(formGroup) as any;

        expect(termos).toMatchObject(sampleWithNewData);
      });

      it('should return NewTermos for empty Termos initial value', () => {
        const formGroup = service.createTermosFormGroup();

        const termos = service.getTermos(formGroup) as any;

        expect(termos).toMatchObject({});
      });

      it('should return ITermos', () => {
        const formGroup = service.createTermosFormGroup(sampleWithRequiredData);

        const termos = service.getTermos(formGroup) as any;

        expect(termos).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITermos should not enable id FormControl', () => {
        const formGroup = service.createTermosFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTermos should disable id FormControl', () => {
        const formGroup = service.createTermosFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
