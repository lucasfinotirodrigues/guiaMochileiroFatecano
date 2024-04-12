import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResumosComponent } from './modal-resumos.component';

describe('ModalResumosComponent', () => {
  let component: ModalResumosComponent;
  let fixture: ComponentFixture<ModalResumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResumosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
