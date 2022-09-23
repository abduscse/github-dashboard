import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  searchHistory = this.localStorage.get('search_history');
  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

}
