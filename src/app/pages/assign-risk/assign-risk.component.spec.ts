import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRiskComponent } from './assign-risk.component';

describe('AssignRiskComponent', () => {
  let component: AssignRiskComponent;
  let fixture: ComponentFixture<AssignRiskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignRiskComponent]
    });
    fixture = TestBed.createComponent(AssignRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
