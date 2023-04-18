import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { LocalStorageService } from '../local-storage.service';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { isEmpty } from '../shared/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private appService: AppService, private snackBar: MatSnackBar, private router: Router,
    private localStorage: LocalStorageService) {
    const state = this.router.getCurrentNavigation()?.extras.state as { keywords: string };
    if (state?.keywords) {
      this.enteredText = state.keywords;
      this.onNewSearch();
    }
  }
  enteredText: string = '';
  page = 1;
  per_page = 30;
  users: Array<any> = [];
  userCount: number = 0;
  searchNotPerformed = true;
  /* 
    When user click on card, open profile in new tab.
  */
  onCardClick(user: any) {
    window.open(user.html_url);
  }
  /*
    When Searching users for the first time
  */
  onNewSearch() {
    this.page = 1;
    this.users = [];
    this.searchNotPerformed = true;
    this.search(true);
  }
  /*
  Search for users with entered text
  */
  search(newSearch = false) {
    if (!isEmpty(this.enteredText)) {
      this.appService.getUsers(this.enteredText, this.page, this.per_page).subscribe((res) => {
        this.searchNotPerformed = false;
        this.userCount = res.total_count;
        this.users.push(...res.items);
        if (newSearch) {

          // adding search history item local storage with Success status
          this.localStorage.addSearch({
            keywords: this.enteredText,
            userCount: this.userCount,
            status: this.userCount ? 'Success' : 'Failed'
          });
        }
      }, error => {
        this.searchNotPerformed = false;
        console.log(error);
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: 'User Search Failed!'
        });
        if (newSearch) {
          // adding search history item local storage with Failed status
          this.localStorage.addSearch({
            keywords: this.enteredText,
            userCount: null,
            status: 'Failed'
          });
        }
      });
    } else {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: 'Search keywords not entered!'
      });
    }
  }
  /*
  1. detect the end of page while scrolling
  2. check if more users have to loaded
  3. if yes, update the page number and search again
  */
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if (this.users.length < this.userCount) {
        this.page++;
        this.search();
      }
    }
  }
}
