import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DisciplinasDetailComponent } from './disciplinas-detail.component';

describe('Disciplinas Management Detail Component', () => {
  let comp: DisciplinasDetailComponent;
  let fixture: ComponentFixture<DisciplinasDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplinasDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ disciplinas: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DisciplinasDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DisciplinasDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load disciplinas on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.disciplinas).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
