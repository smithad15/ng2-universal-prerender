'use strict';

require('angular2-universal-polyfills');
require('ts-helpers');
require('../src/universal-hotfix-server');

// const { platformUniversalDynamic } = require('angular2-universal');
// const { PrebootOptions } = require('preboot');

// export interface UniversalPrerenderOptions {
//   asyncDestroy?: boolean; // Delay app module teardown
//   baseUrl?: string;
//   cancel?: boolean;
//   cancelHandler?: () => boolean;
//   cookie?: string;
//   document?: string;
//   documentPath?: string;
//   id?: string; // Build id value only seen in console.time statements
//   ngModule?: any; // Server Module Class
//   originUrl?: string;
//   preboot?: PrebootOptions;
//   precompile?: boolean;
//   req?: any;
//   requestUrl?: string;
//   res?: any;
//   time?: boolean; // Enable console.time measurements for build
// }

class UniversalPrerender {
  // platformRef: any;

  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      this.platformRef = this.platformRef || platformUniversalDynamic();
      this.options.document = this.options.document
        || compilation.assets[this.options.documentPath].source();

      const zone = Zone.current.fork({
        name: 'UNIVERSAL prerender',
        properties: this.options,
      });

      zone.run(() => {
        // TODO: Add AoT Logic to call serializeModuleFactory
        this.platformRef.serializeModule(this.options.ngModule, this.options)
          .then(html => {
            if (typeof html !== 'string' || this.options.cancel) {
              compilation.assets[this.options.documentPath] = {
                source: () => this.options.document,
                size: () => this.options.document.length,
              };
              return callback();
            }

            compilation.assets[this.options.documentPath] = {
              source: () => html,
              size: () => html.length,
            };
            return callback();
          });
      });
    });
  }
}

exports = UniversalPrerender;
