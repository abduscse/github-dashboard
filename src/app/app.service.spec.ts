import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(AppService);
  });

  it('1. should be created', () => {
    expect(service).toBeTruthy();
  });
  it('2. getUsers Function', () => {
    expect(service.getUsers('Tina', 1, 10)).toBeTruthy();
  });
});
