import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HistoryComponent } from '../history/history.component';
import { SearchComponent } from '../search/search.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'search', component: SearchComponent },
          { path: 'history', component: HistoryComponent },
        ]),
        MatIconModule,
        MatToolbarModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  it('1. should create', () => {
    expect(component).toBeTruthy();
  });
  it('2. navigate function', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.currentPage = 'manage_history';
    component.navigate();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    component.currentPage = 'search';
    component.navigate();
    expect(router.navigate).toHaveBeenCalledTimes(2);
  });
});
