import type {OutputChunk} from 'rollup';
import type {PageData} from '@solidpress/types';

export const isPageChunk = (
  chunk: OutputChunk,
): chunk is OutputChunk & {
  facadeModuleId: string;
} => {
  return Boolean(
    chunk.type === 'chunk' &&
      chunk.isEntry &&
      chunk.facadeModuleId?.endsWith('md'),
  );
};

export const isPageFile = (filename: string): boolean =>
  ['mdx', 'md'].some((ext) => filename.endsWith(ext));

export const injectPageData = (
  compiledContent: string,
  pageData: PageData,
): string => {
  return (
    `${compiledContent}\n` +
    `export const pageData = JSON.parse(${JSON.stringify(
      JSON.stringify(pageData),
    )});\n`
  );
};
