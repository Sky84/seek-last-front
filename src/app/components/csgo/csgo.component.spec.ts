import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsgoComponent } from './csgo.component';

describe('CsgoComponent', () => {
  let component: CsgoComponent;
  let fixture: ComponentFixture<CsgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
