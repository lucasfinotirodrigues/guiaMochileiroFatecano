import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DisciplinasFormService } from './disciplinas-form.service';
import { DisciplinasService } from '../service/disciplinas.service';
import { IDisciplinas } from '../disciplinas.model';
import { ITermos } from 'app/entities/termos/termos.model';
import { TermosService } from 'app/entities/termos/service/termos.service';

import { DisciplinasUpdateComponent } from './disciplinas-update.component';

describe('Disciplinas Management Update Component', () => {
  let comp: DisciplinasUpdateComponent;
  let fixture: ComponentFixture<DisciplinasUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let disciplinasFormService: DisciplinasFormService;
  let disciplinasService: DisciplinasService;
  let termosService: TermosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DisciplinasUpdateComponent],
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
      .overrideTemplate(DisciplinasUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisciplinasUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    disciplinasFormService = TestBed.inject(DisciplinasFormService);
    disciplinasService = TestBed.inject(DisciplinasService);
    termosService = TestBed.inject(TermosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Termos query and add missing value', () => {
      const disciplinas: IDisciplinas = { id: 456 };
      const termos: ITermos = { id: 56712 };
      disciplinas.termos = termos;

      const termosCollection: ITermos[] = [{ id: 79770 }];
      jest.spyOn(termosService, 'query').mockReturnValue(of(new HttpResponse({ body: termosCollection })));
      const additionalTermos = [termos];
      const expectedCollection: ITermos[] = [...additionalTermos, ...termosCollection];
      jest.spyOn(termosService, 'addTermosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ disciplinas });
      comp.ngOnInit();

      expect(termosService.query).toHaveBeenCalled();
      expect(termosService.addTermosToCollectionIfMissing).toHaveBeenCalledWith(
        termosCollection,
        ...additionalTermos.map(expect.objectContaining)
      );
      expect(comp.termosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const disciplinas: IDisciplinas = { id: 456 };
      const termos: ITermos = { id: 45144 };
      disciplinas.termos = termos;

      activatedRoute.data = of({ disciplinas });
      comp.ngOnInit();

      expect(comp.termosSharedCollection).toContain(termos);
      expect(comp.disciplinas).toEqual(disciplinas);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDisciplinas>>();
      const disciplinas = { id: 123 };
      jest.spyOn(disciplinasFormService, 'getDisciplinas').mockReturnValue(disciplinas);
      jest.spyOn(disciplinasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disciplinas });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disciplinas }));
      saveSubject.complete();

      // THEN
      expect(disciplinasFormService.getDisciplinas).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(disciplinasService.update).toHaveBeenCalledWith(expect.objectContaining(disciplinas));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDisciplinas>>();
      const disciplinas = { id: 123 };
      jest.spyOn(disciplinasFormService, 'getDisciplinas').mockReturnValue({ id: null });
      jest.spyOn(disciplinasService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disciplinas: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disciplinas }));
      saveSubject.complete();

      // THEN
      expect(disciplinasFormService.getDisciplinas).toHaveBeenCalled();
      expect(disciplinasService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDisciplinas>>();
      const disciplinas = { id: 123 };
      jest.spyOn(disciplinasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disciplinas });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(disciplinasService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTermos', () => {
      it('Should forward to termosService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(termosService, 'compareTermos');
        comp.compareTermos(entity, entity2);
        expect(termosService.compareTermos).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
