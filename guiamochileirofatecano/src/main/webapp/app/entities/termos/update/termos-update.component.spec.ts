import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TermosFormService } from './termos-form.service';
import { TermosService } from '../service/termos.service';
import { ITermos } from '../termos.model';

import { TermosUpdateComponent } from './termos-update.component';

describe('Termos Management Update Component', () => {
  let comp: TermosUpdateComponent;
  let fixture: ComponentFixture<TermosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let termosFormService: TermosFormService;
  let termosService: TermosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TermosUpdateComponent],
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
      .overrideTemplate(TermosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TermosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    termosFormService = TestBed.inject(TermosFormService);
    termosService = TestBed.inject(TermosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const termos: ITermos = { id: 456 };

      activatedRoute.data = of({ termos });
      comp.ngOnInit();

      expect(comp.termos).toEqual(termos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITermos>>();
      const termos = { id: 123 };
      jest.spyOn(termosFormService, 'getTermos').mockReturnValue(termos);
      jest.spyOn(termosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ termos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: termos }));
      saveSubject.complete();

      // THEN
      expect(termosFormService.getTermos).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(termosService.update).toHaveBeenCalledWith(expect.objectContaining(termos));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITermos>>();
      const termos = { id: 123 };
      jest.spyOn(termosFormService, 'getTermos').mockReturnValue({ id: null });
      jest.spyOn(termosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ termos: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: termos }));
      saveSubject.complete();

      // THEN
      expect(termosFormService.getTermos).toHaveBeenCalled();
      expect(termosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITermos>>();
      const termos = { id: 123 };
      jest.spyOn(termosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ termos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(termosService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
