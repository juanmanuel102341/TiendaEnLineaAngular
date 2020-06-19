import { Component } from '@angular/core';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent} from './main/main.component';
import { DataService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'app works!';
}
