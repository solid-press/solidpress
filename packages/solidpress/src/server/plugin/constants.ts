import {APP_PATH} from '../paths';

export const hashRE = /\.(\w+)\.js$/;
export const staticInjectMarkerRE =
  /\b(const _hoisted_\d+ = \/\*(?:#|@)__PURE__\*\/\s*createStaticVNode)\("(.*)", (\d+)\)/g;
export const staticStripRE =
  /['"`]__VS_STATIC_START__[\s\S]*?__VP_STATIC_END__['"`]/g;
export const staticRestoreRE = /__VS_STATIC_(START|END)__/g;

export const scriptClientRE =
  /<script\b[^>]*client\b[^>]*>([\s\S]*?)<\/script>/;

const SITE_DATA_KEY = '@siteData';
const VERSIONS_DATA_KEY = '@versions';

export const SITE_DATA_PATH = `/${SITE_DATA_KEY}`;
export const VERSIONS_DATA_PATH = `/${VERSIONS_DATA_KEY}`

export const HTML_RESPONSE = `
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/@fs/${APP_PATH}/app.js"></script>
  </body>
</html>
`;
