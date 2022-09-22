import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { isEmpty } from '../utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private appService: AppService) { }
  enteredText: string = '';
  users = null;
  ngOnInit(): void {
  }
  search() {
    if (!isEmpty(this.enteredText)) {
      this.appService.getUsers(this.enteredText).subscribe((users) => {
        // console.log(users)
        this.users = users;
      });
    }
  }
}
