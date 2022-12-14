import type {ViteDevServer} from 'vite';
import {HTML_RESPONSE} from './constants';

type MiddleWareHandler = ViteDevServer['middlewares']['handle'];

export const solidPressMiddleware: MiddleWareHandler = (req, res, next) => {
  if (req.url!.endsWith('.html')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(HTML_RESPONSE);

    return;
  }

  next();
};
