import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThereminComponent } from './theremin.component';
import {MovingDotComponent} from '../moving-dot/moving-dot.component';

@NgModule({
  declarations: [ThereminComponent, MovingDotComponent],
  imports: [
    CommonModule
  ],
  exports: [ThereminComponent]
})
export class ThereminModule { }
