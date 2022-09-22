import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getUsers(enteredText: string): Observable<any> {
    return this.http.get('https://api.github.com/search/users?q=' + enteredText, {
      headers: { Authorization: 'Bearer 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' }
    }) as Observable<any>;
  }
}
