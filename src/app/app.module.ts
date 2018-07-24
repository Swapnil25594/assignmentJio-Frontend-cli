import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { IOTModule } from './iot/iot.module';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToasterModule,
    Routing,
    IOTModule
  ],
  providers: [ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private toasterService: ToasterService) {
    this.toasterService = toasterService;
  };

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: false,
    positionClass: 'toast-top-right'
  });
}
