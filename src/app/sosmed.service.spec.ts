import { TestBed } from '@angular/core/testing';

import { SosmedService } from './sosmed.service';

describe('SosmedService', () => {
  let service: SosmedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SosmedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
