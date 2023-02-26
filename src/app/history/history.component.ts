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

  onDeleteItem(id: number) {
    this.localStorage.clearSearchItem(id);
    this.searchHistory = this.localStorage.get('search_history');
  }
  onSearchAgain(keywords: string) {
    this.router.navigate(['/search'], {
      state: { keywords }
    });
  }
}
