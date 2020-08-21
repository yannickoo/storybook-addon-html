"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _html = require("./decorators/html");

Object.keys(_html).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _html[key];
    }
  });
});
console.warn('Importing the withHTML decorator from @whitespace/storybook-addon-html is deprecated. Import from @whitespace/storybook-addon-html/[framework] instead. Using the deprecated path will result in @whitespace/storybook-addon-html/html being used.');