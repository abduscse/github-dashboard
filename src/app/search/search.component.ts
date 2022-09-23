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
  users = null;
  ngOnInit(): void {
  }
  search() {
    if (!isEmpty(this.enteredText)) {
      this.appService.getUsers(this.enteredText).subscribe((res) => {
        this.users = res.items;
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: 'User Search Successful!'
        });
      }, error => {
        console.log(error);
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: 'User Search Failed!'
        });
      });
    }
  }
}
