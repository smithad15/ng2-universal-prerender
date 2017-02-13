// Patch pulled from universal-starter to fix Angular v2 bugs. Should be able
// to be removed for Angular v4
'use strict';

const compiler = require('@angular/compiler');
const {
  __platform_browser_private__: browserPrivate,
} = require('@angular/platform-browser');
const { __core_private__: corePrivate } = require('@angular/core');

let patch = false;

if (!corePrivate.ViewUtils) {
  patch = true;
  corePrivate.ViewUtils = corePrivate.view_utils;
}

if (compiler && compiler.SelectorMatcher && compiler.CssSelector) {
  patch = true;
  Object.assign(compiler, {
    __compiler_private__: {
      SelectorMatcher: compiler.SelectorMatcher,
      CssSelector: compiler.CssSelector,
    },
  });
}

if (patch) {
  const universal = require('angular2-platform-node/__private_imports__');
  universal.ViewUtils = corePrivate.view_utils;
  universal.CssSelector = universal.CssSelector || compiler.CssSelector;
  universal.SelectorMatcher =
    universal.SelectorMatcher || compiler.SelectorMatcher;
}

// Fix Material Support
browserPrivate.HammerGesturesPlugin.prototype.supports =
  function universalMaterialSupports(eventName) {
    return Boolean(this.isCustomEvent(eventName));
  };

// Fix Universal Style
const {
  NodeDomRootRenderer,
  NodeDomRenderer,
} = require('angular2-universal/node');
NodeDomRootRenderer.prototype.renderComponent = componentProto =>
  new NodeDomRenderer(this, componentProto, this._animationDriver);
