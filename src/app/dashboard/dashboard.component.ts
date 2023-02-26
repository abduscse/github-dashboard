import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentPage: string | null = null;
  navIcon = 'manage_history';
  navTitle = 'Search History';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      const event = e as NavigationEnd;
      this.currentPage = event.urlAfterRedirects.split('/')[1];
      this.navIcon = this.currentPage === 'search' ? 'manage_history' : 'search';
    });
  }

  ngOnInit(): void {
  }
  navigate() {
    if (this.currentPage === 'search') {
      this.navIcon = 'search';
      this.navTitle = 'Search';
      this.router.navigate(['/history']);
    } else {
      this.navIcon = 'manage_history';
      this.navTitle = 'Search History';
      this.router.navigate(['/search']);
    }
  }
}
