import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProjetosFormService } from './projetos-form.service';
import { ProjetosService } from '../service/projetos.service';
import { IProjetos } from '../projetos.model';
import { IDisciplinas } from 'app/entities/disciplinas/disciplinas.model';
import { DisciplinasService } from 'app/entities/disciplinas/service/disciplinas.service';

import { ProjetosUpdateComponent } from './projetos-update.component';

describe('Projetos Management Update Component', () => {
  let comp: ProjetosUpdateComponent;
  let fixture: ComponentFixture<ProjetosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let projetosFormService: ProjetosFormService;
  let projetosService: ProjetosService;
  let disciplinasService: DisciplinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProjetosUpdateComponent],
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
      .overrideTemplate(ProjetosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProjetosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projetosFormService = TestBed.inject(ProjetosFormService);
    projetosService = TestBed.inject(ProjetosService);
    disciplinasService = TestBed.inject(DisciplinasService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Disciplinas query and add missing value', () => {
      const projetos: IProjetos = { id: 456 };
      const disciplinas: IDisciplinas = { id: 10466 };
      projetos.disciplinas = disciplinas;

      const disciplinasCollection: IDisciplinas[] = [{ id: 29733 }];
      jest.spyOn(disciplinasService, 'query').mockReturnValue(of(new HttpResponse({ body: disciplinasCollection })));
      const additionalDisciplinas = [disciplinas];
      const expectedCollection: IDisciplinas[] = [...additionalDisciplinas, ...disciplinasCollection];
      jest.spyOn(disciplinasService, 'addDisciplinasToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ projetos });
      comp.ngOnInit();

      expect(disciplinasService.query).toHaveBeenCalled();
      expect(disciplinasService.addDisciplinasToCollectionIfMissing).toHaveBeenCalledWith(
        disciplinasCollection,
        ...additionalDisciplinas.map(expect.objectContaining)
      );
      expect(comp.disciplinasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const projetos: IProjetos = { id: 456 };
      const disciplinas: IDisciplinas = { id: 76696 };
      projetos.disciplinas = disciplinas;

      activatedRoute.data = of({ projetos });
      comp.ngOnInit();

      expect(comp.disciplinasSharedCollection).toContain(disciplinas);
      expect(comp.projetos).toEqual(projetos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProjetos>>();
      const projetos = { id: 123 };
      jest.spyOn(projetosFormService, 'getProjetos').mockReturnValue(projetos);
      jest.spyOn(projetosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projetos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: projetos }));
      saveSubject.complete();

      // THEN
      expect(projetosFormService.getProjetos).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(projetosService.update).toHaveBeenCalledWith(expect.objectContaining(projetos));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProjetos>>();
      const projetos = { id: 123 };
      jest.spyOn(projetosFormService, 'getProjetos').mockReturnValue({ id: null });
      jest.spyOn(projetosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projetos: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: projetos }));
      saveSubject.complete();

      // THEN
      expect(projetosFormService.getProjetos).toHaveBeenCalled();
      expect(projetosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProjetos>>();
      const projetos = { id: 123 };
      jest.spyOn(projetosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projetos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(projetosService.update).toHaveBeenCalled();
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
