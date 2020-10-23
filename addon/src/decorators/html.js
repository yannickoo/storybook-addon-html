import { Node, document } from 'global';
import { TemplateResult } from 'lit-html/lib/template-result'
import { render } from 'lit-html'
import { addons, makeDecorator } from '@storybook/addons';
import { parameters } from '.';
import { EVENT_CODE_RECEIVED } from '../shared';

export const withHTML = makeDecorator({
  ...parameters,
  wrapper: (getStory, context, { options = {} }) => {
    const channel = addons.getChannel();
    const element = getStory();
    let html;
    if (typeof element === 'string') {
      html = element;
    } else if (element instanceof Node) {
      html = element.outerHTML;
    } else if (element instanceof TemplateResult) {
      const tabContent = document.createElement('div')
      document.body.appendChild(tabContent)

      if (tabContent) {
        render(element, tabContent)
        html = tabContent.innerHTML
          .replace(/<!---->/g, '')
          .replace(/([a-z-])+="\s*"/g, function (a) {
            return a.replace('=""', '')
          })

        tabContent.remove()
      }
    }
    channel.emit(EVENT_CODE_RECEIVED, { html, options });
    return element;
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
