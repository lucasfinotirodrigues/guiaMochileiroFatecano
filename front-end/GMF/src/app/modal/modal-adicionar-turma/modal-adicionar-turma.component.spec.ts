import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarTurmaComponent } from './modal-adicionar-turma.component';

describe('ModalAdicionarTurmaComponent', () => {
  let component: ModalAdicionarTurmaComponent;
  let fixture: ComponentFixture<ModalAdicionarTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarTurmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
