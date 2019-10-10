import { TestBed } from '@angular/core/testing';

import { ThereminService } from './theremin.service';

describe('ThereminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThereminService = TestBed.get(ThereminService);
    expect(service).toBeTruthy();
  });
});
