import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../projetos.test-samples';

import { ProjetosFormService } from './projetos-form.service';

describe('Projetos Form Service', () => {
  let service: ProjetosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetosFormService);
  });

  describe('Service methods', () => {
    describe('createProjetosFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProjetosFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            assunto: expect.any(Object),
            disciplinas: expect.any(Object),
          })
        );
      });

      it('passing IProjetos should create a new form with FormGroup', () => {
        const formGroup = service.createProjetosFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            assunto: expect.any(Object),
            disciplinas: expect.any(Object),
          })
        );
      });
    });

    describe('getProjetos', () => {
      it('should return NewProjetos for default Projetos initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProjetosFormGroup(sampleWithNewData);

        const projetos = service.getProjetos(formGroup) as any;

        expect(projetos).toMatchObject(sampleWithNewData);
      });

      it('should return NewProjetos for empty Projetos initial value', () => {
        const formGroup = service.createProjetosFormGroup();

        const projetos = service.getProjetos(formGroup) as any;

        expect(projetos).toMatchObject({});
      });

      it('should return IProjetos', () => {
        const formGroup = service.createProjetosFormGroup(sampleWithRequiredData);

        const projetos = service.getProjetos(formGroup) as any;

        expect(projetos).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProjetos should not enable id FormControl', () => {
        const formGroup = service.createProjetosFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProjetos should disable id FormControl', () => {
        const formGroup = service.createProjetosFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
