import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal/node';
import './universal-hotfix-server';

import { AppModule } from './app/app.module';

@NgModule({
  imports: [
    UniversalModule,
    AppModule,
  ],
  providers: [],
})
export class ServerModule { }
