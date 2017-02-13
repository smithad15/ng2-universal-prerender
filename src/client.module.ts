import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal/browser';

import { AppModule } from './app/app.module';

@NgModule({
  imports: [
    UniversalModule,
    AppModule,
  ],
  providers: [],
})
export class ClientModule { }
