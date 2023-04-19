import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../local-storage.service';
import { SearchComponent } from '../search/search.component';
import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let localStorage: LocalStorageService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'search', component: SearchComponent },
        ]),
        MatIconModule,
        MatCardModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    localStorage = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  it('1. should create', () => {
    expect(component).toBeTruthy();
  });
  it('2. should create', () => {
    spyOn(localStorage, 'get').and.callThrough();
    component.onDeleteItem(101);
    expect(localStorage.get).toHaveBeenCalled();
  });
  it('3. onSearchAgain create', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.onSearchAgain('Tina');
    expect(router.navigate).toHaveBeenCalled();
  });
});
