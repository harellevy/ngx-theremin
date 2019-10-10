import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThereminComponent } from './theremin.component';

describe('ThereminComponent', () => {
  let component: ThereminComponent;
  let fixture: ComponentFixture<ThereminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThereminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThereminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
