import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingDotComponent } from './moving-dot.component';

describe('MovingDotComponent', () => {
  let component: MovingDotComponent;
  let fixture: ComponentFixture<MovingDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
