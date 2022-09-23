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
    this.appService.isLoading.subscribe(flag => this.loading = flag);
  }
}
