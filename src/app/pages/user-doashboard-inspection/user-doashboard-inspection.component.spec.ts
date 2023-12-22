import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDoashboardInspectionComponent } from './user-doashboard-inspection.component';

describe('UserDoashboardInspectionComponent', () => {
  let component: UserDoashboardInspectionComponent;
  let fixture: ComponentFixture<UserDoashboardInspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDoashboardInspectionComponent]
    });
    fixture = TestBed.createComponent(UserDoashboardInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
