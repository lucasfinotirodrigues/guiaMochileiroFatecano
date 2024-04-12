import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventosComponent } from './modal-eventos.component';

describe('ModalEventosComponent', () => {
  let component: ModalEventosComponent;
  let fixture: ComponentFixture<ModalEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
