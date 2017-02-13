// Patch pulled from universal-starter to fix Angular v2 bugs. Should be able
// to be removed for Angular v4

const compiler = require('@angular/compiler');
const { __core_private__: corePrivate } = require('@angular/core');

if (!corePrivate.ViewUtils) {
  corePrivate.ViewUtils = corePrivate.view_utils;
}

if (compiler && compiler.SelectorMatcher && compiler.CssSelector) {
  Object.assign(compiler, {
    __compiler_private__: {
      SelectorMatcher: compiler.SelectorMatcher,
      CssSelector: compiler.CssSelector,
    },
  });
}
