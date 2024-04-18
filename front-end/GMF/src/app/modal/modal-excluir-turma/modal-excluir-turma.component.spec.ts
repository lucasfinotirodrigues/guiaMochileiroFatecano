import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirTurmaComponent } from './modal-excluir-turma.component';

describe('ModalExcluirTurmaComponent', () => {
  let component: ModalExcluirTurmaComponent;
  let fixture: ComponentFixture<ModalExcluirTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirTurmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExcluirTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
