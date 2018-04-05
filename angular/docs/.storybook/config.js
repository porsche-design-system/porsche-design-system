import { configure } from '@storybook/angular';

function loadStories() {
    require('../src/main.ts');
}

configure(loadStories, module);
