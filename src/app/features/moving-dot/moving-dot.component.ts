import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-moving-dot',
  templateUrl: './moving-dot.component.html',
  styleUrls: ['./moving-dot.component.scss']
})
export class MovingDotComponent implements OnInit {
  @Input() x: number;
  @Input() y: number;
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
