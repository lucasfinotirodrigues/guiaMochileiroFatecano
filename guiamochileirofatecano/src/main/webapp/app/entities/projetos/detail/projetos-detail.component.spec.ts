import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetosDetailComponent } from './projetos-detail.component';

describe('Projetos Management Detail Component', () => {
  let comp: ProjetosDetailComponent;
  let fixture: ComponentFixture<ProjetosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ projetos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProjetosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProjetosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load projetos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.projetos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
