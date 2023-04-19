import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Navigation, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AppService } from '../app.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;
  let appService: AppService;
  let snackBar = {
    openFromComponent: () => { }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule
      ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: snackBar
        }
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          keywords: 'Tina'
        }
      }
    } as unknown as Navigation);
    appService = TestBed.inject(AppService);
    spyOn(appService, 'getUsers').and.returnValues(
      of({ total_count: 1, items: [{}] }),
      throwError(null),
      of({ total_count: 0, items: [] })
    );
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('1. should create', () => {
    expect(component).toBeTruthy();
  });
  it('2. search function', () => {
    component.search(true);
    expect(component.userCount).toEqual(1);

    component.search(true);
    expect(component.userCount).toEqual(0);

    component.enteredText = '';
    spyOn(snackBar, 'openFromComponent').and.callThrough();
    component.search();
    expect(snackBar.openFromComponent).toHaveBeenCalledTimes(1);
  });
  it('3. onScroll function', () => {
    component.users = [{}];
    component.userCount = 10;
    spyOn(component, 'search').and.callFake(() => { });
    component.onScroll({ target: { offsetHeight: 100, scrollTop: 100, scrollHeight: 100 } });
    expect(component.search).toHaveBeenCalled();
  });
  it('4. onCardClick function', () => {
    spyOn(window, 'open').and.callThrough();
    component.onCardClick({ html_url: null });
    expect(window.open).toHaveBeenCalled();
  });
});
