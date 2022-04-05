import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbsComponent } from './lbs.component';

describe('LbsComponent', () => {
  let component: LbsComponent;
  let fixture: ComponentFixture<LbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
