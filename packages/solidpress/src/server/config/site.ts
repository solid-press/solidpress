import {mergeWithDefault} from './utils';

import type {UserConfig, HeadConfigs, SiteData} from './types';

const defaultSiteConfig = {
  base: '/',
  lang: 'en-US',
  themeConfig: {},
  title: 'SolidPress',
  description: 'A SolidPress application',
  appearance: true,
  locales: {},
};

export const resolveSiteData = (config: UserConfig): SiteData => {
  const headConfigs = resolveHeadData(config);

  const {appearance, base, description, lang, locales, themeConfig, title, secondaryTitle} =
    config;

  return mergeWithDefault(
    {
      appearance,
      base,
      lang,
      description,
      head: headConfigs,
      locales,
      secondaryTitle,
      themeConfig,
      title,
    },
    defaultSiteConfig,
  ) as SiteData;
};

function resolveHeadData(config: UserConfig): HeadConfigs {
  const head = config.head ?? [];
  return head.concat([]);
}
