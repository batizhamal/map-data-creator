import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasestationsComponent } from './basestations.component';

describe('BasestationsComponent', () => {
  let component: BasestationsComponent;
  let fixture: ComponentFixture<BasestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasestationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
