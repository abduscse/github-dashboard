import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  searchHistory = this.localStorage.get('search_history');
  constructor(private localStorage: LocalStorageService, private router: Router) { }

  // When User deletes a search history item, remove it from Local storage
  onDeleteItem(id: number) {
    this.localStorage.clearSearchItem(id);
    this.searchHistory = this.localStorage.get('search_history');
  }
  /* 
    When User searches from history item, use previous search keywords from Local storage for 
    search again
  */
  onSearchAgain(keywords: string) {
    this.router.navigate(['/search'], {
      state: { keywords }
    });
  }
}
