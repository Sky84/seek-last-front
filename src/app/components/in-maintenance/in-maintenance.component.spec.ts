import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMaintenanceComponent } from './in-maintenance.component';

describe('InMaintenanceComponent', () => {
  let component: InMaintenanceComponent;
  let fixture: ComponentFixture<InMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
