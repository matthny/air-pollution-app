import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionWarningComponent } from './pollution-warning.component';

describe('PollutionWarningComponent', () => {
  let component: PollutionWarningComponent;
  let fixture: ComponentFixture<PollutionWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollutionWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollutionWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
