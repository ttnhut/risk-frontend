import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationManagementComponent } from './configuration-management.component';

describe('ConfigurationManagementComponent', () => {
  let component: ConfigurationManagementComponent;
  let fixture: ComponentFixture<ConfigurationManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationManagementComponent]
    });
    fixture = TestBed.createComponent(ConfigurationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
