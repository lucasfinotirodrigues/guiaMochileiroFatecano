import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresComponent } from './valores.component';

describe('ValoresComponent', () => {
  let component: ValoresComponent;
  let fixture: ComponentFixture<ValoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
