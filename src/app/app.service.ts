import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoading = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

  getUsers(enteredText: string, page: number, per_page: number): Observable<any> {
    return this.http.get(
      'search/users?q=' + enteredText +
      '&page=' + page + '&per_page=' + per_page
    ) as Observable<any>;
  }
}
