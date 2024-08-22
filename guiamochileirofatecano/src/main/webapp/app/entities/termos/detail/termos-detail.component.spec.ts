import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TermosDetailComponent } from './termos-detail.component';

describe('Termos Management Detail Component', () => {
  let comp: TermosDetailComponent;
  let fixture: ComponentFixture<TermosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ termos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TermosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TermosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load termos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.termos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
