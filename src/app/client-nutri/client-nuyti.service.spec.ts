import { TestBed } from '@angular/core/testing';

import { ClientNuytiService } from './client-nuyti.service';

describe('ClientNuytiService', () => {
  let service: ClientNuytiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNuytiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
