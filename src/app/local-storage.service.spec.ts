import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { HistoryComponent } from './history/history.component';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [MatCardModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(LocalStorageService);
  });
  it('1. should be created', () => {
    expect(service).toBeTruthy();
  });
  it('2. get function', () => {
    service.clear();
    let value = service.get('someKey');
    expect(value).toBeNull();
    value = service.get({});
    expect(value).toBeNull();
  });
  it('3. set function', () => {
    service.set({ name: 'tina' }, 'Saved');
    const value = service.get({ name: 'tina' });
    expect(value).toEqual('Saved');
  });
  it('4. clearItem function', () => {
    service.clearItem({ name: 'tina' });
    let value = service.get({ name: 'tina' });
    expect(value).toBeNull();

    service.clearItem('Tina');
    value = service.get('Tina');
    expect(value).toBeNull();
  });
  it('5. addSearch function', () => {
    spyOn(service, 'set').and.callThrough();
    service.addSearch({ id: 100, status: 'success' });
    expect(service.set).toHaveBeenCalledTimes(1);
  });
  it('6. clearSearchItem function', () => {
    spyOn(service, 'set').and.callThrough();
    service.addSearch({ id: 101, status: 'success' });
    service.clearSearchItem(101);
    expect(service.set).toHaveBeenCalledTimes(2);
  });
});
