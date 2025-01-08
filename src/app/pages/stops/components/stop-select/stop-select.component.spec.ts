import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSelectComponent } from './stop-select.component';

describe('StopSelectComponent', () => {
  let component: StopSelectComponent;
  let fixture: ComponentFixture<StopSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
