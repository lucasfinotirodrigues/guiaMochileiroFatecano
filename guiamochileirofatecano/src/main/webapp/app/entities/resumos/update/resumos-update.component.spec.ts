import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ResumosFormService } from './resumos-form.service';
import { ResumosService } from '../service/resumos.service';
import { IResumos } from '../resumos.model';
import { IDisciplinas } from 'app/entities/disciplinas/disciplinas.model';
import { DisciplinasService } from 'app/entities/disciplinas/service/disciplinas.service';

import { ResumosUpdateComponent } from './resumos-update.component';

describe('Resumos Management Update Component', () => {
  let comp: ResumosUpdateComponent;
  let fixture: ComponentFixture<ResumosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let resumosFormService: ResumosFormService;
  let resumosService: ResumosService;
  let disciplinasService: DisciplinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ResumosUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ResumosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ResumosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    resumosFormService = TestBed.inject(ResumosFormService);
    resumosService = TestBed.inject(ResumosService);
    disciplinasService = TestBed.inject(DisciplinasService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Disciplinas query and add missing value', () => {
      const resumos: IResumos = { id: 456 };
      const disciplinas: IDisciplinas = { id: 68378 };
      resumos.disciplinas = disciplinas;

      const disciplinasCollection: IDisciplinas[] = [{ id: 8257 }];
      jest.spyOn(disciplinasService, 'query').mockReturnValue(of(new HttpResponse({ body: disciplinasCollection })));
      const additionalDisciplinas = [disciplinas];
      const expectedCollection: IDisciplinas[] = [...additionalDisciplinas, ...disciplinasCollection];
      jest.spyOn(disciplinasService, 'addDisciplinasToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ resumos });
      comp.ngOnInit();

      expect(disciplinasService.query).toHaveBeenCalled();
      expect(disciplinasService.addDisciplinasToCollectionIfMissing).toHaveBeenCalledWith(
        disciplinasCollection,
        ...additionalDisciplinas.map(expect.objectContaining)
      );
      expect(comp.disciplinasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const resumos: IResumos = { id: 456 };
      const disciplinas: IDisciplinas = { id: 28658 };
      resumos.disciplinas = disciplinas;

      activatedRoute.data = of({ resumos });
      comp.ngOnInit();

      expect(comp.disciplinasSharedCollection).toContain(disciplinas);
      expect(comp.resumos).toEqual(resumos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResumos>>();
      const resumos = { id: 123 };
      jest.spyOn(resumosFormService, 'getResumos').mockReturnValue(resumos);
      jest.spyOn(resumosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resumos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resumos }));
      saveSubject.complete();

      // THEN
      expect(resumosFormService.getResumos).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(resumosService.update).toHaveBeenCalledWith(expect.objectContaining(resumos));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResumos>>();
      const resumos = { id: 123 };
      jest.spyOn(resumosFormService, 'getResumos').mockReturnValue({ id: null });
      jest.spyOn(resumosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resumos: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resumos }));
      saveSubject.complete();

      // THEN
      expect(resumosFormService.getResumos).toHaveBeenCalled();
      expect(resumosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IResumos>>();
      const resumos = { id: 123 };
      jest.spyOn(resumosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resumos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(resumosService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDisciplinas', () => {
      it('Should forward to disciplinasService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(disciplinasService, 'compareDisciplinas');
        comp.compareDisciplinas(entity, entity2);
        expect(disciplinasService.compareDisciplinas).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
