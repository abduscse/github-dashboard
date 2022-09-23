import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../app.service';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { isEmpty } from '../shared/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private appService: AppService, private snackBar: MatSnackBar) { }
  enteredText: string = '';
  page = 1;
  per_page = 30;
  users: Array<any> = [];
  userCount: number = 0;
  searchNotPerformed = true;
  onCardClick(user: any) {
    window.open(user.html_url);
  }
  ngOnInit(): void {
  }
  onNewSearch() {
    this.page = 1;
    this.users = [];
    this.searchNotPerformed = true;
    this.search();
  }
  search() {
    if (!isEmpty(this.enteredText)) {
      this.appService.getUsers(this.enteredText, this.page, this.per_page).subscribe((res) => {
        this.searchNotPerformed = false;
        this.userCount = res.total_count;
        this.users.push(...res.items);
      }, error => {
        this.searchNotPerformed = false;
        console.log(error);
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: 'User Search Failed!'
        });
      });
    } else {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: 'Search keywords not entered!'
      });
    }
  }
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if (this.users.length < this.userCount) {
        this.page++;
        this.search();
      }
    }
  }
}
