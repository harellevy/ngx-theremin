import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThereminComponent } from './theremin.component';

@NgModule({
  declarations: [ThereminComponent],
  imports: [
    CommonModule
  ],
  exports: [ThereminComponent]
})
export class ThereminModule { }
