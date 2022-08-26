import {visit} from 'unist-util-visit';
import {toString} from 'mdast-util-to-string';
import {slugify} from '@solidpress/utils';

import type {Transformer} from 'unified';
import type {Heading} from 'mdast';
import type {Node} from 'unist-util-visit';

import type {Processor} from '@solidpress/types';

type HProperties = {
  id: string;
};

export function headingPlugin(this: Processor): Transformer {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const processor = this;

  return function headingProcessor(root) {
    visit(root, 'heading', (node: Heading) => {
      const data: Node['data'] = node.data || (node.data = {});
      const props = (data.hProperties ||
        (data.hProperties = {})) as HProperties;

      const textNodes = node.children.filter(({type}) => {
        return !['html', 'jsx'].includes(type);
      });
      const heading = toString(textNodes.length ? textNodes : node);

      const {id} = props;
      data.id = props.id = id
        ? slugify(id, {maintainCase: true})
        : slugify(heading);

      if ([2, 3].includes(node.depth)) {
        const pageData = processor.__data;
        const headers = pageData.headers || (pageData.headers = []);
        headers.push({
          level: node.depth,
          title: heading,
          slug: data.id as string,
        });
      }
    });
  };
}
