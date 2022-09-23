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

  getUsers(enteredText: string): Observable<any> {
    return this.http.get('search/users?q=' + enteredText) as Observable<any>;
    // return this.http.get('https://api.github.com/search/users?q=abdus', {
    //   headers: {
    //     Authorization: 'Bearer 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'
    //   }
    // }) as Observable<any>;
  }
}
