import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';
import { CONSTANTS } from './constants';

@Injectable({
  providedIn: 'root',
})
export class APIInterceptor implements HttpInterceptor {
  private requests: Array<HttpRequest<any>> = [];
  constructor(private appService: AppService, private snackBar: MatSnackBar) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and set request url and headers.
    const request = req.clone({
      url: `${environment.baseUrl}/${req.url}`,
      setHeaders: {
        Authorization: 'Bearer ' + CONSTANTS.ACCESS_TOKEN,
      },
    });
    this.requests.push(request);
    this.appService.isLoading.next(true);

    return new Observable((observer) => {
      const subscription = next.handle(request).subscribe({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(request);
            observer.next(event);
          }
        },
        error: (error) => {
          this.removeRequest(request);
          observer.error(error);
        },
        complete: () => {
          this.removeRequest(request);
          observer.complete();
        },
      });
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }
  // Remove request when response is received
  private removeRequest(request: HttpRequest<any>): void {
    const index = this.requests.indexOf(request);
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
    this.appService.isLoading.next(this.requests.length > 0);
  }
}
