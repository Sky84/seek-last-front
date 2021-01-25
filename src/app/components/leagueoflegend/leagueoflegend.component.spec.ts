import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueoflegendComponent } from './leagueoflegend.component';

describe('LeagueoflegendComponent', () => {
  let component: LeagueoflegendComponent;
  let fixture: ComponentFixture<LeagueoflegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagueoflegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueoflegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
