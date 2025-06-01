import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockControlsComponent } from './clock-controls.component';

describe('ClockControlsComponent', () => {
  let component: ClockControlsComponent;
  let fixture: ComponentFixture<ClockControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
