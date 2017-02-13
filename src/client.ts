import 'angular2-universal-polyfills';
import './universal-hotfix-client';

import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal/browser';

import { AppModule } from './app/app.module';

declare const __PRODUCTION__: boolean;
declare const __TEST__: boolean;

if (__PRODUCTION__) {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

if (!__TEST__) {
  platformUniversalDynamic().bootstrapModule(AppModule);
}
