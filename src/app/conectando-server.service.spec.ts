/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConectandoServerService } from './conectando-server.service';

describe('ConectandoServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConectandoServerService]
    });
  });

  it('should ...', inject([ConectandoServerService], (service: ConectandoServerService) => {
    expect(service).toBeTruthy();
  }));
});
