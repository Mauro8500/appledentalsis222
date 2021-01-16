import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterprodComponent } from './registerprod.component';

describe('RegisterprodComponent', () => {
  let component: RegisterprodComponent;
  let fixture: ComponentFixture<RegisterprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
