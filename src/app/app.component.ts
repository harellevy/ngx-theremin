import { Component } from '@angular/core';
import {ThereminBodyPartEnum} from './features/theramin/theremin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-theramin';
  thereminBodyPartEnum = ThereminBodyPartEnum;
}
