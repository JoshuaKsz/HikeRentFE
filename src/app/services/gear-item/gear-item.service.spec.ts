import { TestBed } from '@angular/core/testing';

import { GearItemService } from './gear-item.service';

describe('GearItemService', () => {
  let service: GearItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GearItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
