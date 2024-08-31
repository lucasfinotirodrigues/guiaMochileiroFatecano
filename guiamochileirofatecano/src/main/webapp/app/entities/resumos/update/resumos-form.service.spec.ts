import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../resumos.test-samples';

import { ResumosFormService } from './resumos-form.service';

describe('Resumos Form Service', () => {
  let service: ResumosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumosFormService);
  });

  describe('Service methods', () => {
    describe('createResumosFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createResumosFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assunto: expect.any(Object),
            resumo: expect.any(Object),
            createdDate: expect.any(Object),
            disciplinas: expect.any(Object),
          })
        );
      });

      it('passing IResumos should create a new form with FormGroup', () => {
        const formGroup = service.createResumosFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            assunto: expect.any(Object),
            resumo: expect.any(Object),
            createdDate: expect.any(Object),
            disciplinas: expect.any(Object),
          })
        );
      });
    });

    describe('getResumos', () => {
      it('should return NewResumos for default Resumos initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createResumosFormGroup(sampleWithNewData);

        const resumos = service.getResumos(formGroup) as any;

        expect(resumos).toMatchObject(sampleWithNewData);
      });

      it('should return NewResumos for empty Resumos initial value', () => {
        const formGroup = service.createResumosFormGroup();

        const resumos = service.getResumos(formGroup) as any;

        expect(resumos).toMatchObject({});
      });

      it('should return IResumos', () => {
        const formGroup = service.createResumosFormGroup(sampleWithRequiredData);

        const resumos = service.getResumos(formGroup) as any;

        expect(resumos).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IResumos should not enable id FormControl', () => {
        const formGroup = service.createResumosFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewResumos should disable id FormControl', () => {
        const formGroup = service.createResumosFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
