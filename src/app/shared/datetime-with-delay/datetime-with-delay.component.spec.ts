import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeWithDelayComponent } from './datetime-with-delay.component';

describe('DatetimeWithDelayComponent', () => {
  let component: DatetimeWithDelayComponent;
  let fixture: ComponentFixture<DatetimeWithDelayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatetimeWithDelayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatetimeWithDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
