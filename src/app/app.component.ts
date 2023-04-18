import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;
  constructor(private appService: AppService) {
    // Open the Spinner while API is Running, 
    // isLoading = true for loading and isLoading = false to turn it off
    this.appService.isLoading.subscribe(flag => this.loading = flag);
  }
}
