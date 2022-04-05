import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasestationComponent } from './add-basestation.component';

describe('AddBasestationComponent', () => {
  let component: AddBasestationComponent;
  let fixture: ComponentFixture<AddBasestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBasestationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBasestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
