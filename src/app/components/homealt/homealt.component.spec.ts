import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomealtComponent } from './homealt.component';

describe('HomealtComponent', () => {
  let component: HomealtComponent;
  let fixture: ComponentFixture<HomealtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomealtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomealtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
