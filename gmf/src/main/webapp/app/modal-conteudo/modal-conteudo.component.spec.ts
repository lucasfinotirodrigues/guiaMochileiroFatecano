import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConteudoComponent } from './modal-conteudo.component';

describe('ModalConteudoComponent', () => {
  let component: ModalConteudoComponent;
  let fixture: ComponentFixture<ModalConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConteudoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
