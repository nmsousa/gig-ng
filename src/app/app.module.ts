import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { LiveCodeComponent } from './components/live-code/live-code.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PaymentsComponent,
    LiveCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
