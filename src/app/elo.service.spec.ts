/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EloService } from './elo.service';

describe('Service: Elo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EloService]
    });
  });

  it('should ...', inject([EloService], (service: EloService) => {
    expect(service).toBeTruthy();
  }));
});
