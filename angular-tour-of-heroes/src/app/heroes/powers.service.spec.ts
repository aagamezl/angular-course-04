import { TestBed } from '@angular/core/testing';

import { PowersService } from './powers.service';

describe('PowersService', () => {
  let service: PowersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
