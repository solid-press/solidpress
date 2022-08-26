// import attrsPlugin from 'markdown-it-attrs'
import {createProcessor} from '@mdx-js/mdx';
import emojiPlugin from 'remark-emoji';
import {headingPlugin} from './plugins/headings';

import type {Processor} from '@solidpress/types';

const createRenderer = async (): Promise<Processor> => {
  const compiler = createProcessor({
    remarkPlugins: [emojiPlugin, headingPlugin],
    jsxImportSource: 'solid-js/h',
  });

  return compiler as Processor;
};

export default createRenderer;
