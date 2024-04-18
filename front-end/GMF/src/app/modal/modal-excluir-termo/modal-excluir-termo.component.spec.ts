import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirTermoComponent } from './modal-excluir-termo.component';

describe('ModalExcluirTermoComponent', () => {
  let component: ModalExcluirTermoComponent;
  let fixture: ComponentFixture<ModalExcluirTermoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirTermoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExcluirTermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
