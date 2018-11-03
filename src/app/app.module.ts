import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
