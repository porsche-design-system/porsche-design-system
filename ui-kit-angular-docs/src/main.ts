import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {components} from './components';
import {directives} from './directives';
import {ExampleViewer, ExampleViewerSelector} from "./components/example-viewer/example-viewer";
import {FormsModule} from "@angular/forms";
import {StyleWrapper, StyleWrapperSelector} from "./components/style-wrapper/style-wrapper";
import {withKnobs} from '@storybook/addon-knobs/angular';
import {linkTo} from '@storybook/addon-links';
import {SyntaxHighlighter} from "./components/syntax-highlighter/syntax-highlighter";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


const markdownContext = require.context('../stories/', true, /\.\/.*\/.*\.md$/);
const propsContext = require.context('../stories/', true, /\.\/.*\/.*\.ts$/);

const exampleViewerRegex = new RegExp(`<${ExampleViewerSelector}>\s*((.|\n)*?)\s*<\/${ExampleViewerSelector}>`, `gim`);
const exampleViewerContentPropsname = `exampleViewerContent`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getStoryName(parts) {
  return capitalizeFirstLetter(parts[1].split('_').slice(1).join(" "));
}

function getChapterName(parts) {
  let ret = "";
  for (let part of parts.slice(2, parts.length - 1)) {
    ret += capitalizeFirstLetter(part.split('_').slice(1).join(" ")) + " - ";
  }
  let mdFileName = parts[parts.length-1].substr(0, parts[parts.length-1].length - 3);

  ret += capitalizeFirstLetter(mdFileName.split('_').slice(1).join(" "));
  return ret;
}

function getPropsForStory(story) {
  const storyPropsModule = story.substr(0, story.length - 2) + 'ts';
  let storyProps = {};
  if (propsContext.keys().indexOf(storyPropsModule) > -1) {
    storyProps = propsContext(storyPropsModule).props;
  }
  return storyProps;
}

markdownContext.keys().forEach(story => {
  const pathTokens = story.split('/');
  if (pathTokens.length < 3) {
    return;
  }

  let exampleIterator = 0;
  const exampleViewerContent = [];
  let tpl = markdownContext(story).replace(exampleViewerRegex, function (match, content) {
    exampleViewerContent.push(content);
    const ret = `<${ExampleViewerSelector} [content]="${exampleViewerContentPropsname}[${exampleIterator}]">${content}</${ExampleViewerSelector}>`;
    exampleIterator++;
    return ret;
  });

  storiesOf(getStoryName(pathTokens), module)
    .addDecorator(withKnobs)
    .addDecorator(
      moduleMetadata({
        declarations: [
          ExampleViewer,
          StyleWrapper,
          SyntaxHighlighter,
          ...components,
          ...directives
        ],
        imports: [
          FormsModule,
          BrowserAnimationsModule
        ],
        entryComponents: components
      })
    )
    .add(getChapterName(pathTokens), (() => {
      let ret = {
        template: `<${StyleWrapperSelector}>` + tpl + `</${StyleWrapperSelector}>`,
        props: {
          puiDocsAction: action,
          puiDocslinkTo: linkTo,
          ...getPropsForStory(story)
        }
      };
      ret.props[exampleViewerContentPropsname] = exampleViewerContent;
      return ret;
    }));
});
