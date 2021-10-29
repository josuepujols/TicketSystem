import { TestBed } from '@angular/core/testing';

import { ConfirmboxService } from './confirmbox.service';

describe('ConfirmboxService', () => {
  let service: ConfirmboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
