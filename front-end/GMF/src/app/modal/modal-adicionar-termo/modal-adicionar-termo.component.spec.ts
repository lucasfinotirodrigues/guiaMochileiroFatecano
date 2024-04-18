import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarTermoComponent } from './modal-adicionar-termo.component';

describe('ModalAdicionarTermoComponent', () => {
  let component: ModalAdicionarTermoComponent;
  let fixture: ComponentFixture<ModalAdicionarTermoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarTermoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarTermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
