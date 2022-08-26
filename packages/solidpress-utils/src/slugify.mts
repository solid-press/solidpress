import createSlugger from 'github-slugger';

const slugger = new createSlugger();

export type SlugifyOptions = {
  maintainCase?: boolean;
};

export const slugify = (val: string, options?: SlugifyOptions): string =>
  slugger.slug(val, options?.maintainCase);
