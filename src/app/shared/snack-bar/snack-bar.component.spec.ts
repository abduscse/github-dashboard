import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackBarComponent } from './snack-bar.component';

describe('SnackBarComponent', () => {
    let component: SnackBarComponent;
    let fixture: ComponentFixture<SnackBarComponent>;
    let router: Router;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SnackBarComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                MatIconModule,
                MatToolbarModule
            ],
            providers: [
                {
                    provide: MatSnackBar,
                    useValue: {}
                },
                {
                    provide: MAT_SNACK_BAR_DATA,
                    useValue: ''
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(SnackBarComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });
    it('1. should create', () => {
        expect(component).toBeTruthy();
    });
});
