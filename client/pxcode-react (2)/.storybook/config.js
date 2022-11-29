import React from 'react';
import { storiesOf } from '@storybook/react';
import Components from 'components';

const Pages = [];
for (let component in Components) {
  if (Components[component].inStorybook) {
    console.log(`Loaded component: ${component}`);
    Pages.push({ name: component, ComponentClass: Components[component] });
  }
}

Pages.forEach(({ name, ComponentClass }) => {
  storiesOf('pxCode', module).add(name, () => <ComponentClass />);
});
