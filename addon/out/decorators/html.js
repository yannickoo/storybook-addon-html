"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withHTML = void 0;

var _global = require("global");

var _templateResult = require("lit-html/lib/template-result");

var _litHtml = require("lit-html");

var _addons = require("@storybook/addons");

var _ = require(".");

var _shared = require("../shared");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withHTML = (0, _addons.makeDecorator)(_objectSpread(_objectSpread({}, _.parameters), {}, {
  wrapper: function wrapper(getStory, context, _ref) {
    var _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options;

    var channel = _addons.addons.getChannel();

    var element = getStory();
    var html;

    if (typeof element === 'string') {
      html = element;
    } else if (element instanceof _global.Node) {
      html = element.outerHTML;
    } else if (element instanceof _templateResult.TemplateResult) {
      var tabContent = _global.document.createElement('div');

      _global.document.body.appendChild(tabContent);

      if (tabContent) {
        (0, _litHtml.render)(element, tabContent);
        html = tabContent.innerHTML.replace(/<!---->/g, '').replace(/([a-z-])+="\s*"/g, function (a) {
          return a.replace('=""', '');
        });
        tabContent.remove();
      }
    }

    channel.emit(_shared.EVENT_CODE_RECEIVED, {
      html: html,
      options: options
    });
    return element;
  }
}));
exports.withHTML = withHTML;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}