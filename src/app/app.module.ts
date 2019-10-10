import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThereminModule } from './features/theramin/theremin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ThereminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
